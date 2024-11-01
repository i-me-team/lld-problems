#!/bin/bash

if [ -z "$1" ]; then
    echo "Please provide a project name"
    exit 1
fi

PROJECT_NAME=$1
TEMPLATE_REPO="i-me-team/reacts-tailwind-template"

# Create new project from template
cd apps
npx degit "$TEMPLATE_REPO" "$PROJECT_NAME"

# Update package name in package.json
cd "$PROJECT_NAME"

# Read the current package.json
TEMP_FILE=$(mktemp)
jq --arg name "$PROJECT_NAME" '
  # Update the name
  .name = $name |
  # Move react and react-dom to peerDependencies
  .peerDependencies = {
    "react": (.dependencies.react // "^18.2.0"),
    "react-dom": (.dependencies["react-dom"] // "^18.2.0")
  } |
  # Remove react and react-dom from dependencies
  del(.dependencies.react) |
  del(.dependencies["react-dom"]) |
  # Remove common dev dependencies that should be at root
  del(.devDependencies["@types/react"]) |
  del(.devDependencies["@types/react-dom"]) |
  del(.devDependencies.typescript) |
  del(.devDependencies.vite) |
  del(.devDependencies["@vitejs/plugin-react"]) |
  del(.devDependencies.tailwindcss) |
  del(.devDependencies.postcss) |
  del(.devDependencies.autoprefixer)
' package.json > "$TEMP_FILE"

# Replace the original package.json
mv "$TEMP_FILE" package.json

# Go back to root directory
cd ../..

# Ensure these dependencies exist in root package.json
ROOT_DEPS=(
  "react"
  "react-dom"
  "@types/react"
  "@types/react-dom"
  "typescript"
  "vite"
  "@vitejs/plugin-react"
  "tailwindcss"
  "postcss"
  "autoprefixer"
)

# Check if jq exists
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed. Please install jq first."
    echo "On macOS: brew install jq"
    echo "On Ubuntu/Debian: sudo apt-get install jq"
    exit 1
fi

# Add dependencies to root if they don't exist
for dep in "${ROOT_DEPS[@]}"; do
  if ! jq -e ".dependencies[\"$dep\"] or .devDependencies[\"$dep\"]" package.json > /dev/null; then
    if [[ "$dep" == "react" || "$dep" == "react-dom" ]]; then
      pnpm add -w "$dep"
    else
      pnpm add -Dw "$dep"
    fi
  fi
done

# Install dependencies from root
pnpm install

echo "Project $PROJECT_NAME created successfully!"
echo "Common dependencies have been hoisted to the root package.json"
echo "To get started:"
echo "  cd apps/$PROJECT_NAME"
echo "  pnpm dev"