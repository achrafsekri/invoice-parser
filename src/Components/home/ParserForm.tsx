import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import React from "react";

const ParserForm = () => {
  const fileUploadRef = React.useRef(null);
  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
          <form>
            <div className="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-gray-700 sm:grid-cols-12 sm:gap-4">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Parse invoice
                </h2>
              </div>
            </div>
            <div className="mb-3 sm:col-span-3">
              <label
                htmlFor="af-submit-application-full-name"
                className="mt-2.5 inline-block text-sm font-medium text-gray-500"
              >
                Title
              </label>
            </div>

            <div className="mb-3 sm:col-span-9">
              <div className="sm:flex">
                <InputText className="w-full" />
              </div>
            </div>
            <div className="mb-3 sm:col-span-3">
              <label
                htmlFor="af-submit-application-full-name"
                className="mt-2.5 inline-block text-sm font-medium text-gray-500"
              >
                Image
              </label>
            </div>
            <div>
              <Tooltip
                target=".custom-choose-btn"
                content="Choose"
                position="bottom"
              />
              <Tooltip
                target=".custom-upload-btn"
                content="Upload"
                position="bottom"
              />
              <Tooltip
                target=".custom-cancel-btn"
                content="Clear"
                position="bottom"
              />

              <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                multiple
                accept="image/*"
                maxFileSize={1000000}
                // onUpload={onTemplateUpload}
                // onSelect={onTemplateSelect}
                // onError={onTemplateClear}
                // onClear={onTemplateClear}
                // headerTemplate={headerTemplate}
                // itemTemplate={itemTemplate}
                // emptyTemplate={emptyTemplate}
                // chooseOptions={chooseOptions}
                // uploadOptions={uploadOptions}
                // cancelOptions={cancelOptions}
              />
            </div>
            <div className="mt-6 flex gap-4 ">
              <Button label="Submit" />
              <Button label="Cancel" severity="danger" outlined />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParserForm;
