import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

const RTE = ({ control, defaultValue = "", name, label }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm sm:text-base">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name || "content"}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.apiKey}
            initialValue={defaultValue}
            init={{
              height: 300,
              width: "100%", // ensures full width in any container
              menubar: false,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks",
                "code", "fullscreen", "insertdatetime", "media",
                "table", "code", "help", "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style: `
                body {
                  font-family:Helvetica,Arial,sans-serif;
                  font-size:14px;
                  padding: 8px;
                  box-sizing: border-box;
                }

                @media (max-width: 640px) {
                  html, body, .tox, .tox-edit-area, iframe {
                    width: 100% !important;
                    font-size: 13px;
                  }
                }
              `,
              branding: false,
              resize: true,
              mobile: {
                menubar: false,
                toolbar: [
                  "undo", "redo", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link"
                ]
              }
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
