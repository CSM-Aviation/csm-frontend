import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const imagesDirectory = path.join(process.cwd(), 'public', 'images', `${id}_Images`, id)
  
  console.log("Searching for images in:", imagesDirectory);

  try {
    if (!fs.existsSync(imagesDirectory)) {
      console.log("Directory does not exist:", imagesDirectory);
      return NextResponse.json({ error: 'Image directory not found' }, { status: 404 })
    }

    const fileNames = fs.readdirSync(imagesDirectory)
    console.log("Files found in directory:", fileNames);

    const imageFiles = fileNames.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )
    console.log("Image files found:", imageFiles);

    const imagePaths = imageFiles.map(file => 
      `/images/${id}_Images/${id}/${file}`
    )
    console.log("Returning image paths:", imagePaths);

    return NextResponse.json(imagePaths)
  } catch (error:any) {
    console.error(`Error reading directory for ${id}:`, error)
    return NextResponse.json({ error: 'Failed to fetch images', details: error.message }, { status: 500 })
  }
}