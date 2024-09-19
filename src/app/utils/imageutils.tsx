import fs from 'fs';
import path from 'path';

export function getImages(id: string): string[] {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images', `${id}_Images`);
  
  try {
    // Read the contents of the directory
    const fileNames = fs.readdirSync(imagesDirectory);
    
    // Filter for image files (you can add more extensions if needed)
    const imageFiles = fileNames.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    
    // Map the file names to their full paths
    const imagePaths = imageFiles.map(file => 
      `/images/${id}_Images/${file}`
    );
    
    return imagePaths;
  } catch (error) {
    console.error(`Error reading directory for ${id}:`, error);
    return []; // Return an empty array if there's an error
  }
}