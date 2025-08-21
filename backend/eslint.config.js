import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [
      "js/recommended",        
      "airbnb-base",          
      "prettier"             
    ],
    languageOptions: {
      globals: {
        ...globals.node,      
        ...globals.jest       
      }
    },
    rules: {
      "no-console": "off",                  
      "no-unused-vars": ["warn"],          
      "import/extensions": ["error", "always"],
      "func-names": "off",                    
      "no-underscore-dangle": "off"            
    }
  }
]);
