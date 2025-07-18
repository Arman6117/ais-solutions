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

    if (!isValidObjectId(moduleId)) {
      return { success: false, message: "Invalid module id" };
    }

    const module = await Module.findById(new ObjectId(moduleId));
    if(name !== undefined) module.name = name;
    if(price !== undefined) module.price = price;
    if(discount !== undefined) module.discount = discount;
    if(description !== undefined) module.description = description
  } catch (error) {}
};
