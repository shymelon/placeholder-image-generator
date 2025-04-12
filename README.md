# Batch Placeholder Image Generator

A browser-based tool that allows users to generate and download multiple placeholder images at once.

## Features

- 📝 Define multiple placeholder images in a simple format
- 📦 Download images as a ZIP file or individually

## Input Format

Each line in the textarea represents one image with the following format:

```
filename, format, size [optional], text [optional], background-color [optional]
```

### Example Input

```
hero-banner, png, 800x400, Welcome!, ff5733
icon, jpg, 128x128, , 00bfff
logo, webp
```

### Parameters

- **filename** (required): Name of the image file (without extension)
- **format** (required): Image format (png, jpg, webp, svg, gif, avif)
- **size** (optional): Dimensions in WIDTHxHEIGHT format (default: 300x300)
- **text** (optional): Text to display on the image (default: size dimensions)
- **background-color** (optional): Background color in hex format without # (default: 000000)
- **text-color** (optional): Text color in hex format without # (default: ffffff)

## How It Works

1. Enter image specifications in the textarea, one per line
2. Click "Parse Input" to validate and preview your images
3. Edit parameters if needed using the form fields
4. Click "Download Images" to download all valid images (as ZIP if multiple)

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```
