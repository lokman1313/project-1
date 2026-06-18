"use client";

import React, { useState, useEffect } from "react";
import {
  FaPlusCircle,
  FaEdit,
  FaBuilding,
  FaTrash,
  FaGlobe,
  FaUsers,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { FiUploadCloud, FiMapPin, FiX } from "react-icons/fi";
import { HiOfficeBuilding } from "react-icons/hi";
import Image from "next/image";
import { toast } from "react-toastify";
import { creatCompany } from "@/lib/action/company";

const INDUSTRIES = [
  "Technology", "Finance", "Design", "Healthcare",
  "Education", "Marketing", "E-commerce", "Manufacturing", "Other",
];

const EMPLOYEE_RANGES = [
  "1-10", "11-50", "51-200", "201-500", "500+",
];

const STATUS_CONFIG = {
  Approve: {
    label: "Approved",
    icon: <FaCheckCircle className="text-[10px]" />,
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  Pending: {
    label: "Pending review",
    icon: <FaClock className="text-[10px]" />,
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  Reject: {
    label: "Rejected",
    icon: <FaTimesCircle className="text-[10px]" />,
    classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${cfg.classes}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      {children}
    </div>
  );
}

const inputBase =
  "bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700/50 transition-all w-full";

const selectBase =
  "bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700/50 transition-all w-full appearance-none h-[38px]";

export default function CompanySection({ reqruiter, requiterCompany }) {
  const [company, setCompany] = useState(requiterCompany);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employees: "1–10",
    description: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_BB_UPLOAD_API;

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        industry: company.industry || "Technology",
        website: company.website || "",
        location: company.location || "",
        employees: company.employees || "1–10",
        description: company.description || "",
      });
      setLogoPreview(company.logo || null);
      setLogoUrl(company.logo || "");
    }
  }, [isEditing, company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("Configuration error: image upload key not found.");
      return;
    }

    setLogoPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: uploadData,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setLogoUrl(result.data.url);
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setLogoPreview(null);
      setLogoUrl("");
      const input = document.getElementById("logo-input");
      if (input) input.value = "";
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = (e) => {
    e.preventDefault();
    setLogoPreview(null);
    setLogoUrl("");
    const input = document.getElementById("logo-input");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) {
      toast.warning("Please wait until the image finishes uploading.");
      return;
    }

    const finalCompanyData = {
      ...formData,
      logo: logoUrl,
      userId: reqruiter?.id,
      status: company?.status || "Pending",
    };

    const payload = await creatCompany(finalCompanyData);
    if (payload?.insertedId) {
      toast.success(company ? "Company profile saved." : "Company registered successfully.");
      setCompany({ ...finalCompanyData, _id: payload.insertedId });
      setIsEditing(false);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    if (!company) {
      setLogoPreview(null);
      setLogoUrl("");
      setFormData({ name: "", industry: "Technology", website: "", location: "", employees: "1-10", description: "" });
    }
  };

  // ─── View 1: Empty state ──────────────────────────────────────────────────
  if (!company?._id && !isEditing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] p-6">
        <div className="w-full max-w-lg">
          {/* Icon mark */}
          <div className="mb-8 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
              <HiOfficeBuilding className="text-4xl text-neutral-500" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                <FaPlusCircle className="text-[10px] text-white" />
              </span>
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-100">
            No company registered yet
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">
            Add your company to unlock the job board, post requirements, and connect with top talent.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 active:scale-[0.97]"
            >
              <FaPlusCircle className="text-base" />
              Register your company
            </button>
          </div>

          {/* Subtle divider rows */}
          <div className="mt-12 grid grid-cols-3 gap-3 text-center">
            {["Post jobs", "Find talent", "Build brand"].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 py-3 px-2">
                <p className="text-xs text-neutral-500">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── View 2: Company profile card ────────────────────────────────────────
  if (company && !isEditing) {
    const websiteDisplay = company.website?.replace(/^https?:\/\//, "");
    const websiteHref = company.website?.startsWith("http") ? company.website : `https://${company.website}`;

    return (
      <div className="flex min-h-screen items-start justify-center bg-[#080808] p-6 pt-12">
        <div className="w-full max-w-xl">
          
          {/* Header strip */}
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
              Company profile
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white active:scale-[0.97]"
            >
              <FaEdit className="text-xs" /> Edit
            </button>
          </div>

          {/* Main card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden">
            
            {/* Top hero row */}
            <div className="flex items-center gap-4 p-5 border-b border-neutral-800/60">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                {company.logo ? (
                  <Image src={company.logo} alt={company.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FaBuilding className="text-xl text-neutral-600" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-neutral-100 truncate">
                    {company.name}
                  </h2>
                  <StatusBadge status={company.status} />
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <FaBriefcase className="text-neutral-600" /> {company.industry}
                  </span>
                  {company.location && (
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <FaMapMarkerAlt className="text-neutral-600" /> {company.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <FaUsers className="text-neutral-600" /> {company.employees} employees
                  </span>
                </div>

                {company.website && (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    <FaGlobe className="text-[10px]" />
                    {websiteDisplay}
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-2">
                About
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {company.description || (
                  <span className="italic text-neutral-600">
                    No description yet.{" "}
                    <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">
                      Add one
                    </button>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── View 3: Edit / Register form ────────────────────────────────────────
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#080808] p-6 pt-10">
      <div className="w-full max-w-[520px]">

        {/* Page heading */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-neutral-100">
            {company ? "Edit company profile" : "Register your company"}
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            {company
              ? "Keep your profile accurate to attract the right candidates."
              : "Fill in your company details to get started on HireLoop."}
          </p>
        </div>

        {/* Card form */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-5 space-y-5">

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Company name">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                    className={inputBase}
                    required
                  />
                </FieldGroup>

                <FieldGroup label="Industry">
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={selectBase}
                    >
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-500" />
                  </div>
                </FieldGroup>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Website">
                  <div className="flex overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 focus-within:border-neutral-600 focus-within:ring-1 focus-within:ring-neutral-700/50 transition-all">
                    <span className="flex shrink-0 items-center border-r border-neutral-800 bg-neutral-800/50 px-3 text-xs text-neutral-500">
                      https://
                    </span>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="company.com"
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </FieldGroup>

                <FieldGroup label="Location">
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-sm" />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className={`${inputBase} pl-8`}
                    />
                  </div>
                </FieldGroup>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="Team size">
                  <div className="relative">
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className={selectBase}
                    >
                      {EMPLOYEE_RANGES.map((r) => (
                        <option key={r} value={r}>{r} employees</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-neutral-500" />
                  </div>
                </FieldGroup>

                <FieldGroup label="Logo">
                  {logoPreview ? (
                    <div className="flex h-[38px] items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-2">
                      <div className="flex items-center gap-2">
                        <div className="relative h-6 w-6 overflow-hidden rounded border border-neutral-700">
                          <Image src={logoPreview} alt="Preview" fill className="object-cover" />
                        </div>
                        <span className="text-xs text-neutral-400">
                          {isUploading ? (
                            <span className="animate-pulse text-blue-400">Uploading…</span>
                          ) : (
                            "Logo selected"
                          )}
                        </span>
                      </div>
                      <button
                        onClick={handleRemovePreview}
                        className="rounded p-1 text-neutral-600 hover:text-red-400 transition-colors"
                        title="Remove logo"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-[38px] cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-700 bg-neutral-900 px-3 transition hover:border-neutral-600 hover:bg-neutral-800/50">
                      <FiUploadCloud className="text-neutral-500 text-sm" />
                      <span className="text-xs text-neutral-500">Upload logo</span>
                      <input
                        id="logo-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                  )}
                </FieldGroup>
              </div>

              {/* Description */}
              <FieldGroup label="About the company">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe your company's mission, values, and culture…"
                  className={`${inputBase} resize-none leading-relaxed`}
                />
              </FieldGroup>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-2 border-t border-neutral-800 bg-neutral-900/80 px-5 py-3">
              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-lg border border-neutral-800 bg-transparent px-4 py-2 text-xs font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="rounded-lg bg-white px-5 py-2 text-xs font-bold text-neutral-900 transition hover:bg-neutral-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isUploading ? "Uploading…" : company ? "Save changes" : "Register company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}