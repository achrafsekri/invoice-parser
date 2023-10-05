import { createInvoice, parseInvoice } from "  /shared/apiCalls";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import React from "react";
import { useForm, type SubmitHandler, Controller, set } from "react-hook-form";
import { Editor } from "primereact/editor";
import { useRouter } from "next/router";

type Inputs = {
  title: string;
  image: string;
  invoiceinfo: string;
};

const ParserForm = ({ paperType }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [editor, setEditor] = React.useState("");
  const fileUploadRef = React.useRef(null);
  const session = useSession();
  const userId = session?.data?.user.id;
  const router = useRouter();
  const { control, handleSubmit, watch, formState, getValues, setValue } =
    useForm<Inputs>({
      defaultValues: {
        title: "",
        invoiceinfo: "",
        image: "",
      },
    });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    const token = localStorage.getItem("csrfToken");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("images", data.image.files[0]);

    parseInvoice(formData, token)
      .then((res) => {
        // change invoiceinfo value
        setValue("invoiceinfo", res.data[0].detected_text);
        setEditor(
          "<pre>" +
            Object.entries(res.data[0].detected_text)
              .map(([key, value]) => {
                return key + " : " + value[0] + "\n";
              })
              .join("") +
            "</pre>"
        );
        setData(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const upload: SubmitHandler<Inputs> = (typed) => {
    console.log("data", data);
    setLoading(true);
    const invoice = {
      userId: userId,
      info: typed.invoiceinfo,
      image: data.image_base64,
      title: typed.title,
    };
    createInvoice(invoice)
      .then((res) => {
        console.log("res", res);
        setLoading(false);
        router.push("/my-invoices");
      })
      .catch((err) => {
        console.log("err in creating", err);
        setLoading(false);
      });
  };

  return (
    <div>
      {!data && (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0  sm:grid-cols-12 sm:gap-4">
                <div className="sm:col-span-12">
                  <h2 className="text-center text-4xl font-semibold text-gray-400">
                    {paperType}
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
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className="w-full"
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Enter title"
                      />
                    )}
                  />
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

                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      {...field}
                      ref={fileUploadRef}
                      name="image"
                      accept="image/*,.pdf"
                      maxFileSize={5000000}
                      multiple
                      className="p-d-none"
                      customUpload
                      uploadHandler={(e) => {
                        field.onChange(e);
                      }}
                      onError={(e) => {
                        console.log("onError", e);
                      }}
                      chooseOptions={{
                        className: "custom-choose-btn p-button-outlined",
                      }}
                      uploadOptions={{
                        className: "custom-upload-btn p-button-outlined",
                      }}
                      cancelOptions={{
                        className: "custom-cancel-btn p-button-outlined",
                      }}
                    />
                  )}
                />
              </div>
              <div className="mt-6 flex gap-4 ">
                <Button
                  label="Submit"
                  loading={loading}
                  disabled={!formState.isValid}
                />
                <Button label="Cancel" severity="danger" outlined />
              </div>
            </form>
          </div>
        </div>
      )}
      {data && (
        <form onSubmit={handleSubmit(upload)}>
          <div>
            <img
              src={`data:image/jpeg;base64,${data.image_base64}`}
              alt="image"
            />
            <div>
              {/* {Object.entries(data.detected_text).map(([key, value]) => {
                return (
                  <div>
                    {key} : {value[0]}
                  </div>
                );
              })} */}
              <div className="card">
                <Controller
                  name="invoiceinfo"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      {...field}
                      style={{ height: "320px" }}
                      onTextChange={(e) => {
                        field.onChange(e.htmlValue);
                        setEditor(e.htmlValue);
                      }}
                      value={editor}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4 ">
            <Button label="Submit" loading={loading} />
            <Button label="Cancel" severity="danger" outlined />
          </div>
        </form>
      )}
    </div>
  );
};

export default ParserForm;
