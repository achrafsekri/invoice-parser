import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { invoiceService } from "  /shared/mockData";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useRouter } from "next/router";

interface Invoice {
  id: string | null;
  name: string;
  description: string;
  image: string | null;
}

export default function invoicesDemo() {
  const emptyInvoice: Invoice = {
    id: null,
    name: "",
    image: null,
    description: "",
  };

  const router = useRouter();
  const [invoices, setinvoices] = useState<Invoice[]>([]);
  const [invoiceDialog, setInvoiceDialog] = useState<boolean>(false);
  const [deleteInvoiceDialog, setDeleteInvoiceDialog] =
    useState<boolean>(false);
  const [deleteinvoicesDialog, setDeleteinvoicesDialog] =
    useState<boolean>(false);
  const [invoice, setInvoice] = useState<Invoice>(emptyInvoice);
  const [selectedinvoices, setSelectedinvoices] = useState<Invoice[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Invoice[]>>(null);

  useEffect(() => {
    invoiceService
      .getInvoices()
      .then((data) => setinvoices(data))
      .catch((e) => console.log(e));
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    router.push("/");
  };

  const hideDialog = () => {
    setSubmitted(false);
    setInvoiceDialog(false);
  };

  const hideDeleteInvoiceDialog = () => {
    setDeleteInvoiceDialog(false);
  };

  const hideDeleteinvoicesDialog = () => {
    setDeleteinvoicesDialog(false);
  };

  const saveInvoice = () => {
    setSubmitted(true);

    if (invoice.name.trim()) {
      const _invoices = [...invoices];
      const _invoice = { ...invoice };

      if (invoice.id) {
        const index = findIndexById(invoice.id);

        _invoices[index] = _invoice;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Invoice Updated",
          life: 3000,
        });
      } else {
        _invoice.id = createId();
        _invoice.image = "invoice-placeholder.svg";
        _invoices.push(_invoice);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Invoice Created",
          life: 3000,
        });
      }

      setinvoices(_invoices);
      setInvoiceDialog(false);
      setInvoice(emptyInvoice);
    }
  };

  const editInvoice = (invoice: Invoice) => {
    setInvoice({ ...invoice });
    setInvoiceDialog(true);
  };

  const confirmDeleteInvoice = (invoice: Invoice) => {
    setInvoice(invoice);
    setDeleteInvoiceDialog(true);
  };

  const deleteInvoice = () => {
    let _invoices = invoices.filter((val) => val.id !== invoice.id);

    setinvoices(_invoices);
    setDeleteInvoiceDialog(false);
    setInvoice(emptyInvoice);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Invoice Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: string) => {
    let index = -1;

    for (let i = 0; i < invoices.length; i++) {
      if (invoices[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = (): string => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteinvoicesDialog(true);
  };

  const deleteSelectedinvoices = () => {
    let _invoices = invoices.filter((val) => !selectedinvoices.includes(val));

    setinvoices(_invoices);
    setDeleteinvoicesDialog(false);
    setSelectedinvoices([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "invoices Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: RadioButtonChangeEvent) => {
    let _invoice = { ...invoice };

    _invoice["category"] = e.value;
    setInvoice(_invoice);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _invoice = { ...invoice };

    // @ts-ignore
    _invoice[`${name}`] = val;

    setInvoice(_invoice);
  };

  const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
    const val = e.value || 0;
    let _invoice = { ...invoice };

    // @ts-ignore
    _invoice[`${name}`] = val;

    setInvoice(_invoice);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedinvoices || !selectedinvoices.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData: Invoice) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image!}
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  const actionBodyTemplate = (rowData: Invoice) => {
    return (
      <div className="flex gap-5">
        <Button
          icon="pi pi-link"
          rounded
          outlined
          size="small"
          className="mr-2"
          onClick={() => router.push(`/invoices/${rowData.id}`)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          size="small"
          severity="danger"
          onClick={() => confirmDeleteInvoice(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="align-items-center justify-content-between flex flex-wrap gap-2">
      <h4 className="m-0">Manage invoices</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setGlobalFilter(target.value);
          }}
        />
      </span>
    </div>
  );
  const invoiceDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveInvoice} />
    </React.Fragment>
  );
  const deleteInvoiceDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteInvoiceDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteInvoice}
      />
    </React.Fragment>
  );
  const deleteinvoicesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteinvoicesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedinvoices}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={invoices}
          selection={selectedinvoices}
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedinvoices(e.value);
            }
          }}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} invoices"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>

          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="createdAt"
            header="Date"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteInvoiceDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteInvoiceDialogFooter}
        onHide={hideDeleteInvoiceDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {invoice && (
            <span>
              Are you sure you want to delete <b>{invoice.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteinvoicesDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteinvoicesDialogFooter}
        onHide={hideDeleteinvoicesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {invoice && (
            <span>Are you sure you want to delete the selected invoices?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
