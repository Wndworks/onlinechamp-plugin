#!/bin/bash

# Variabelen
OUTPUT="./zip/onlinechamp.zip"  # Het pad naar de zip-bestand in de 'zip' map

# Rootfolder zippen (zonder .git-map en zonder zip_repo.sh in de zip)
zip -r $OUTPUT . -x "*.git*" -x "zip/*" -x "updates/*"

echo "Hoofdfolder gezipt als $OUTPUT"