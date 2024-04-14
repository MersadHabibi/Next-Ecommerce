// Import necessary modules
import path from "path";
import { writeFile } from "fs/promises";

// Define the POST handler for the file upload
export const saveFile = async (file: File, filePath: string) => {
  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return { error: "No files received.", status: 400 };
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");

  const newFilePath =
    `assets/${filePath ? filePath + "/" : ""}` +
    Math.random() * 10000 +
    "-" +
    filename;

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(path.join(process.cwd(), "/public/", newFilePath), buffer);

    // Return a JSON response with a success message and a 201 status code
    return { Message: "Success", status: 201, path: newFilePath };
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return { Message: "Failed", status: 500 };
  }
};
