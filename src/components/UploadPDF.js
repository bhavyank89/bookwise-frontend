"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema
const formSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  author: z.string().min(3, "Author name too short"),
  count: z.string().min(1, "Count required"),
  summary: z.string().min(5, "Summary too short"),
  uploadPDF: z.any(),
});

function UploadBookForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      count: "",
      summary: "",
    },
  });

  const onSubmit = async (values) => {
    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("count", values.count);
    formData.append("summary", values.summary);
  
    // Ensure a file is selected before appending to FormData
    if (values.uploadPDF && values.uploadPDF.length > 0) {
      formData.append("uploadPDF", values.uploadPDF[0]); // append the first file
    } else {
      alert("Please select a PDF file");
      return;
    }
  
    try {
      // Send the formData to the backend using fetch
      const response = await fetch("http://localhost:4000/book/createbook", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const json = await response.json();
  
      if (json.success) {
        alert("Book uploaded successfully!");
        navigate("/dashboard");
      } else {
        alert(json.error || "Upload failed");
      }
    } catch (err) {
      console.error("Error uploading:", err.message);
      alert("Failed to upload book: " + err.message);
    }
  };
  
  return (
    <section className="flex flex-col items-center p-8 max-w-2xl mx-auto bg-[#0d0f17]/90 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📘 Upload New Book</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#1e2230] border border-[#2c2f45]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#1e2230] border border-[#2c2f45]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Copies</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="bg-[#1e2230] border border-[#2c2f45]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#1e2230] border border-[#2c2f45]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uploadPDF"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => onChange(e.target.files)}
                    {...rest}
                    className="bg-[#1e2230] border border-[#2c2f45]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#f5c784] text-black hover:bg-[#f1b65f]">
            Upload Book
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default UploadBookForm;