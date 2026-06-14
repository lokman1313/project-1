"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";

import { FaPlusCircle, FaEdit, FaBuilding, FaTrash, FaGlobe, FaUsers, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { FiUploadCloud, FiMapPin } from "react-icons/fi";
import Image from "next/image";

export default function CompanySection() {
  const [company, setCompany] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  
  // মোডাল ওপেন/ক্লোজ কন্ট্রোল করার জন্য স্টেট (যদি HeroUI-তেisOpen সাপোর্ট থাকে)
  const [isOpen, setIsOpen] = useState(false); 

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_BB_UPLOAD_API;

 const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ১. রানটাইমে সরাসরি কী-টি চেক করা (যেন undefined হয়ে রিকোয়েস্ট না যায়)
    const apiKey = IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMAGE_BB_UPLOAD_API;
    if (!apiKey) {
      console.error("ImgBB API Key is missing!");
      alert("Configuration error: API key not found.");
      return;
    }

    // preview show
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      // ২. apiKey ভ্যারিয়েবলটি এখানে ডাইনামিকালি ব্যবহার করা হয়েছে
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: uploadData, 
        }
      );

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setLogoUrl(result.data.url);
        console.log("Uploaded Image URL:", result.data.url);
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error details:", error);

      setLogoPreview(null);
      setLogoUrl("");

     
      const fileInput = document.getElementById("logo-input");
      if (fileInput) fileInput.value = "";

      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
const handleRemovePreview = (e) => {
  e.preventDefault();

  setLogoPreview(null);
  setLogoUrl("");

  const fileInput =
    document.getElementById("logo-input");

  if (fileInput) {
    fileInput.value = "";
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (isUploading) {
    alert("Please wait until image upload finishes");
    return;
  }

  const formElement = e.currentTarget;

  const formData = new FormData(formElement);

  const textData = {};

  formData.forEach((value, key) => {
    if (key !== "logo") {
      textData[key] = value;
    }
  });

  const finalCompanyData = {
    ...textData,

    logo: logoUrl,

    status: "Pending",
  };

  setCompany(finalCompanyData);

  console.log(finalCompanyData);

  setLogoPreview(null);
  setLogoUrl("");

  formElement.reset();

  setIsOpen(false);
};

  return (
    <div className="p-6 min-h-screen bg-[#0a0a0a] text-white">
      {!company ? (
        <div className="w-full max-w-2xl mx-auto rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900 via-[#111111] to-[#0a0a0a] p-8 shadow-2xl sm:p-12">
  <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-6 mb-8">
    
   
    <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-800 text-3xl sm:text-4xl text-blue-400 shadow-xl ring-4 ring-blue-500/5">
      <FaBuilding className="animate-pulse" />
    </div>

 
    <div className="space-y-2">
      <h2 className="text-2xl font-extrabold tracking-tight text-neutral-100 sm:text-3xl">
        No Company Registered
      </h2>
      <p className="text-base leading-relaxed text-neutral-400 sm:text-lg max-w-lg">
        Register your company now to unlock the job board, start posting requirements, and connect with top talent.
      </p>
    </div>
  </div>

  <div className="flex justify-center sm:justify-start sm:pl-22 md:pl-26">
    <Button 
      className="w-full sm:w-auto px-8 py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 active:scale-[0.98]"
      startContent={<FaPlusCircle className="text-xl" />} 
      onPress={() => setIsOpen(true)}
    >
      Register Your Company
    </Button>
  </div>

  <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
    

            <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
              <Modal.Container placement="center" className="p-4 flex items-center justify-center w-full h-full">
                <Modal.Dialog className="w-[94vw] sm:w-full max-w-[540px] max-h-[85vh] bg-[#121212] border border-[#222] rounded-xl text-white overflow-hidden flex flex-col relative">
                  <Modal.CloseTrigger className="text-gray-400 hover:text-white absolute top-5 right-5 z-10" />

                  <Modal.Header className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex-shrink-0">
                    <Modal.Heading className="text-lg sm:text-xl font-semibold text-gray-100">
                      Register New Company
                    </Modal.Heading>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
                      Enter your business details to start hiring on HireLoop.
                    </p>
                  </Modal.Header>

                  <hr className="border-[#222] mx-5 sm:mx-6 flex-shrink-0" />

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <Modal.Body className="px-5 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                      <div className="flex flex-col gap-4 sm:gap-5">
                        
                        {/* Grid Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-gray-300">Company Name</Label>
                            <Input 
                              name="name" 
                              placeholder="e.g. Acme Corp" 
                              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-500 w-full"
                              required
                            />
                          </TextField>

                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-gray-300">Industry / Category</Label>
                            <div className="relative">
                              <select 
                                name="industry" 
                                defaultValue="Technology"
                                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 w-full appearance-none h-[38px]"
                              >
                                <option value="Technology">Technology</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                              </select>
                              <span className="absolute right-3 top-3.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></span>
                            </div>
                          </TextField>
                        </div>

                        {/* Grid Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-gray-300">Website URL</Label>
                            <div className="flex rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a]">
                              <span className="bg-[#242424] px-3 py-2 text-xs text-gray-400 flex items-center border-r border-[#2a2a2a]">
                                https://
                              </span>
                              <Input 
                                name="website" 
                                placeholder="www.company.com" 
                                className="bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none w-full"
                              />
                            </div>
                          </TextField>

                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-gray-300">Location</Label>
                            <div className="relative flex items-center">
                              <FiMapPin className="absolute left-3 text-gray-500 text-base" />
                              <Input 
                                name="location" 
                                placeholder="City, Country" 
                                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-500 w-full"
                              />
                            </div>
                          </TextField>
                        </div>

                        {/* Grid Row 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-gray-300">Employee Count Range</Label>
                            <div className="relative">
                              <select 
                                name="employees" 
                                defaultValue="1-10 employees"
                                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 w-full appearance-none h-[38px]"
                              >
                                <option value="1-10 employees">1-10 employees</option>
                                <option value="11-50 employees">11-50 employees</option>
                                <option value="51-200 employees">51-200 employees</option>
                                <option value="201+ employees">201+ employees</option>
                              </select>
                              <span className="absolute right-3 top-3.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></span>
                            </div>
                          </TextField>

                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-gray-300">Company Logo</span>
                            
                            {logoPreview ? (
                              <div className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1.5 h-[38px]">
                                <div className="flex items-center gap-2">
                                  <Image 
                                    src={logoPreview} 
                                    alt="Preview" 
                                    width={28}
                                    height={28}
                                    className="rounded object-cover border border-[#3a3a3a]"
                                  />
                                  <span className="text-xs text-gray-400 truncate max-w-[120px]">Image Selected</span>
                                </div>
                                <button 
                                  onClick={handleRemovePreview}
                                  className="p-1 hover:bg-[#222] text-red-400 hover:text-red-500 rounded transition-colors"
                                  title="Remove image"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex items-center gap-3 bg-[#1a1a1a] border border-dashed border-[#3a3a3a] rounded-lg p-3 cursor-pointer hover:bg-[#222] transition-colors h-[38px]">
                                <FiUploadCloud className="text-gray-400 text-lg" />
                                <div className="flex flex-col justify-center">
                                  <span className="text-xs font-semibold text-gray-200">Upload image</span>
                                </div>
                                <input 
                                  id="logo-input"
                                  type="file" 
                                  accept="image/*" 
                                  name="logo" 
                                  className="hidden" 
                                  onChange={handleLogoChange} 
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Description Row */}
                        <TextField className="flex flex-col gap-1.5">
                          <Label className="text-xs font-medium text-gray-300">Brief Description</Label>
                          <textarea 
                            name="description" 
                            rows={3} 
                            placeholder="Tell us about your company's mission and culture..." 
                            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-500 w-full resize-none"
                          />
                        </TextField>
                      </div>
                    </Modal.Body>

                    <Modal.Footer className="px-5 sm:px-6 py-4 bg-[#161616] flex justify-end gap-3 border-t border-[#222] flex-shrink-0">
                   
                      <Button 
                        slot="close"
                        className="bg-transparent border border-[#2a2a2a] hover:bg-[#222] text-sm font-medium text-gray-200 rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 transition"
                      >
                        Cancel
                      </Button>

                     
                      <Button
                        type="submit"
                        disabled={isUploading}
                        className="bg-white hover:bg-gray-100 text-[#121212] text-sm font-bold rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 transition disabled:bg-gray-500"
                      >
                        {isUploading? "Image Uploading..." : "Register Company"}
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>
      ) : (
        /* COMPANY VIEW STATE */
        <div className="mx-auto mt-10 w-full max-w-2xl rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-[#111111] to-[#0d0d0d] p-5 shadow-xl sm:p-7">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between pb-5 border-b border-neutral-800/60">
    
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
      
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-gray-400 shadow-inner">
        {company.logo ? (
          <Image src={company.logo} alt="Logo" fill className="object-cover" />
        ) : (
          <FaBuilding className="text-2xl text-blue-400" />
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <h2 className="text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">
            {company.name}
          </h2>

          <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 capitalize">
            {company.status || "Pending"}
          </span>
        </div>

    
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-neutral-400 sm:justify-start">
          <span className="flex items-center gap-1">
            <FaBriefcase className="text-neutral-500" /> {company.industry}
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-neutral-500" /> {company.location || "No Location"}
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="flex items-center gap-1">
            <FaUsers className="text-neutral-500" /> {company.employees} Employees
          </span>
        </div>


        {company.website && (
          <a
            href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors mt-1"
          >
            <FaGlobe className="text-[11px]" />
            <span className="hover:underline">{company.website}</span>
          </a>
        )}
      </div>
    </div>

    {/* ডান পাশের অ্যাকশন (মোবাইলে এটি টপ/বটমে সুন্দরভাবে ম্যানেজ হবে) */}
    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start">
      {/* মোবাইলের জন্য স্ট্যাটাস ব্যাজ (যখন বড় স্ক্রিনের ব্যাজটি হিডেন থাকবে) */}
      <span className="inline-block sm:hidden px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 capitalize">
        {company.status || "Pending"}
      </span>

      <Button
        size="sm"
        className="w-full sm:w-auto bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-medium rounded-xl px-4 py-2 hover:bg-neutral-800/80 hover:text-white transition-all active:scale-[0.97]"
        startContent={<FaEdit className="text-sm" />}
      >
        Edit Profile
      </Button>
    </div>
  </div>

  {/* ডেসক্রিপশন সেকশন */}
  <div className="pt-5">
    <h3 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
      About Company
    </h3>
    <p className="text-sm text-neutral-400 leading-relaxed font-normal">
      {company.description || "No description provided. Add a description to help candidates know more about your company."}
    </p>
  </div>
</div>
      )}
    </div>
  );
}