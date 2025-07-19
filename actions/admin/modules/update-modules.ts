"use server";

import { connectToDB } from "@/lib/db";
import { ChapterInput } from "@/lib/types";
import { Module } from "@/models/module.model";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";

type ModulesData = {
  moduleId?: string;
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  chapters?: ChapterInput[];
  syllabusLink: string;
  syllabusLabel: string;
};

export const updateModules = async (data: ModulesData) => {
  try {
    await connectToDB();
    const {
      syllabusLabel,
      syllabusLink,
      chapters,
      description,
      discount,
      moduleId,
      name,
      price,
    } = data;

    if (!moduleId || !isValidObjectId(moduleId)) {
      return { success: false, message: "Invalid module id" };
    }

    const module = await Module.findById(new ObjectId(moduleId));
    if (!module) {
      return { success: false, message: "Module not found" };
    }

    if (name !== undefined) module.name = name;
    if (price !== undefined) module.price = price;
    if (discount !== undefined) module.discount = discount;
    if (description !== undefined) module.description = description;
    if (syllabusLink !== undefined) module.syllabusLink = syllabusLink;
    if (syllabusLabel !== undefined) module.syllabusLabel = syllabusLabel;

    if (chapters !== undefined) {
      module.chapters = chapters.map((chapter) => ({
        name: chapter.name,
        description: chapter.description,
        topics:
          chapter.topics?.map((topic) => ({
            title: topic.title,
            description: topic.description,
          })) || [],
      }));
    }

    await module.save();

    return {
      success: true,
      message: "Module updated successfully",
    };
  } catch (error) {
    console.error("[UPDATE_MODULE_ERROR]", error);
    return {
      success: false,
      message: "Something went wrong while updating the module",
    };
  }
};
