"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/config/firebase';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostJob({session}:{session:any}) {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // 1. Initial Values setup
  const initialValues = {
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  };

  // 2. Yup Validation Schema
  const formValidation = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company name is required"),
    location: Yup.string().required("Location is required (e.g., Remote, Abuja)"),
    type: Yup.string().required("Job type is required"),
    salary: Yup.string().required("Salary range is required"),
    description: Yup.string()
      .min(50, "Description must be at least 50 characters")
      .required("Job description is required"),
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <Link href="/" className="inline-block text-white font-bold text-xl tracking-wide mb-6">
            Sereno<span className="text-emerald-400">.</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-white">Post a New Role</h1>
          <p className="text-slate-400 mt-2">Connect with top talent. Fill out the details below to publish your opening.</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl p-6 sm:p-10">
          <Formik 
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={async(values,{resetForm})=>{
              try {
                   const docRef = await addDoc(collection(db,"jobs"),{
            ...values,
             developer: session?.user?.name || "",
             image: session?.user?.image || "",
             uid: session?.user?.id|| "",
             timestamp: new Date().toLocaleDateString()
              })
               resetForm()
              handleOpen()
             console.log("Document written with ID: ", docRef.id);
                
              } catch (error) {
                 console.error("ERROR>>>> , error");
                 alert("Anerror occurred.")
                
              }
          
             }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                
                {/* Job Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">Job Title</label>
                  <Field 
                    type="text" 
                    name="title" 
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                  />
                  <ErrorMessage name="title" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                </div>

                {/* Grid for Company & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
                    <Field 
                      type="text" 
                      name="company" 
                      id="company"
                      placeholder="e.g. EarlyCode"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                    />
                    <ErrorMessage name="company" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1.5">Location</label>
                    <Field 
                      type="text" 
                      name="location" 
                      id="location"
                      placeholder="e.g. Lagos, NG or Remote"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                    />
                    <ErrorMessage name="location" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                  </div>
                </div>

                {/* Grid for Type & Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-1.5">Job Type</label>
                    <Field 
                      as="select" 
                      name="type" 
                      id="type"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors shadow-inner appearance-none"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </Field>
                    <ErrorMessage name="type" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                  </div>

                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-slate-300 mb-1.5">Salary Range</label>
                    <Field 
                      type="text" 
                      name="salary" 
                      id="salary"
                      placeholder="e.g. ₦150k - ₦250k / month"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                    />
                    <ErrorMessage name="salary" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                  </div>
                </div>

                {/* Job Description (Textarea) */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">Job Description</label>
                  <Field 
                    as="textarea"
                    rows="6"
                    name="description" 
                    id="description"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner resize-y"
                  />
                  <ErrorMessage name="description" component="p" className="text-red-400 text-xs mt-1.5 ml-1" />
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/20 focus:outline-none flex justify-center items-center gap-2 ${isSubmitting? "grayscale cursor-not-allowed":"cursor-pointer"}`}
                  >
                    {isSubmitting ? (<FiLoader className='text-base animate-spin' />) : "Publish Job Post"}
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="span">
              <div className='flex items-center justify-center'>
                 <FaCheckCircle  className='text-9xl  text-green-500'/>
                </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span className='text-center'>
              Submission Sucessful! Thank you for your contribution to the community
            </span>
          </Typography>
        </Box>
      </Modal>
    </div>
    </main>
  );
}