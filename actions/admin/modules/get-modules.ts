"use server";

import { connectToDB } from "@/lib/db";
import { ChapterInput, Modules, prModule } from "@/lib/types/types";
import { Module } from "@/models/module.model";
import { format } from "date-fns";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Course } from "@/models/course.model";

type ModuleTableData = {
  id: string;
  name: string;
  course: string[];
  price: number;
  discount: number;
  offerPrice?: number;
  createdAt: Date;
  rating: number;
};

type Topic = {
  title:string,
  description:string,
  id:number
}
type Chapter = {
  name:string,
  id:number,
  description:string,
  topics: Topic[]
}
export const getAllModulesTable = async () => {
  try {
    await connectToDB();

    const modules = await Module.find({})
      .select("_id name createdAt price discount description courseId rating")
      .sort({ createdAt: -1 })
      .lean();

    const formattedModules = modules.map((module) => {
      return {
        _id: `${module._id}`,
        name: module.name as string,
        createdAt: format(new Date(module.createdAt), "PP"),
        price: Number(module.price),
        discount: Number(module.discount),
        description: module.description as string,
        course: module.courseId as string[],
        rating: Number(module.rating) || 0,
      };
    });

    return {
      success: true,
      data: formattedModules || [],
      message: modules.length
        ? "Modules fetched successfully"
        : "No modules found",
    };
  } catch (error) {
    console.error("Error fetching modules:", error);
    return {
      success: false,
      message: "Something went wrong while fetching modules",
    };
  }
};
export const getModuleById = async (id: string) => {
  if (!id) {
    return {
      success: false,
      message: "Module ID is required",
    };
  }
  try {
    await connectToDB();

    const module = await Module.findById(new ObjectId(id));

    if (!module) {
      return {
        success: false,
        message: "Module not found",
      };
    }
    const sanitizedChapters =
      module.chapters?.map((chapter: Chapter, index: number) => ({
        id: index,
        name: chapter.name,
        description: chapter.description,
        topics:
          chapter.topics?.map((topic: Topic, topicIndex: number) => ({
            id: topicIndex,
            title: topic.title,
            description: topic.description,
          })) || [],
      })) || [];

    const cleanedModule: prModule =
      {
        _id: `${module._id}`,
        name: module.name as string,
        courseId: module.courseId as string[],
        syllabusLabel: module.syllabusLabel as string,
        syllabusLink: module.syllabusLink as string,
        batchId: module.batchId as string[],
        description: module.description as string,
        price: Number(module.price),
        discount: Number(module.discount),
        rating: Number(module.rating),
        createdAt: format(module.createdAt, "PP"),
        chapters: sanitizedChapters,
      } || [];

    return { success: true, data: cleanedModule };
  } catch (error) {
    console.error("Error fetching module:", error);
    return {
      success: false,
      message: "Something went wrong while fetching module",
    };
  }
};

export const getAllModulesNames = async () => {
  try {
    await connectToDB();

    const modules = await Module.find({})
      .select("_id name")
      .sort({ createdAt: -1 })
      .lean();

    if (!modules) {
      return { success: false, data: [] };
    }

    const cleanedModule = modules.map((module) => {
      return {
        _id: `${module._id}`,
        name: module.name as string,
      };
    });

    return { success: true, data: cleanedModule };
  } catch (error) {
    console.log("Something went wrong");
    return { success: false, data: [] };
  }
};

