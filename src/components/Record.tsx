import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd"
import { RecordForm, RecordType } from "../types/record"
import { ColumnsType } from "antd/es/table"
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { addRecord, deleteRecord, getRecords, updateRecord } from "../store/actions/recordAction"
import { CategoryType } from "../types/category"
import { Mode } from "../types/general"
import { getCategories } from "../store/actions/categoryActions"
import { render } from "@testing-library/react"


const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0
}

const Record = () => {
    const { data, loading, error } = useSelector((state: AppState) => state.records)
    const { data: categories } = useSelector((state: AppState) => state.categories)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<RecordForm>(emptyForm)
    const [updateId, setUpdateId] = useState<number | null>(null)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const showModal = (mode: Mode) => {
        setIsModalOpen(true);
        setMode(mode)
    };
    const handleOk = () => {
        if (mode === "new") dispatch(addRecord(form))
        else if (mode === "edit" && typeof updateId === "number")
            dispatch(updateRecord(form, updateId))
        else if (mode === "delete" && typeof deleteId === "number")
            dispatch(deleteRecord(deleteId))
        dispatch(addRecord(form))
        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setMode("new")
        setForm(emptyForm)
        setUpdateId(null)
        setDeleteId(null)
    };
    const columns: ColumnsType<RecordType> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: RecordType["amount"], record: RecordType) => {
                return <>{Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(amount)}</>
            }
        }, {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: CategoryType, record: RecordType) => {
                return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>
            }
        },{
            title:"Last Update",
            dataIndex:"updatedAt",
            key:"updatedAt",
            render:(updatedAt:string,record:RecordType)=>{
                return<>{new Date(updatedAt).toLocaleDateString()}{" "}
                {new Date(updatedAt).toLocaleTimeString("tr-TR",{timeStyle:"short"})}</>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: RecordType) => {
                const {title,amount}=record
                const category_id=record.category.id 
                return(
                <Space size="middle">
                    <EditFilled style={{ color: "#0077ff" }}
                        onClick={() => {
                            showModal("edit")
                            setForm({title,amount,category_id})
                            setUpdateId(record.id)
                        }} />
                    <DeleteFilled style={{ color: "#c90000" }}
                        onClick={() => {
                            showModal("delete")
                            setDeleteId(record.id)
                        }
                        } />
                </Space>
            )},
        },
    ];
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(getRecords())
        !categories.length && dispatch(getCategories())
    }, [])

    const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0)
    return (<>
        <div>
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px"
            }}>
                <Button type="primary" onClick={() => showModal("new")}>
                    New Record
                </Button>
            </div>
            <Modal title={mode === "new" ? "Create New Record" : mode === "edit" ? "Update Record" : "Delete Record"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}>
                {mode === "edit" || mode === "new" ?
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item label="Title" required>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={(e) => { setForm({ ...form, title: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item label="Amount" required>
                            <Input
                                name="amount"
                                value={form.amount}
                                type="number"
                                onChange={(e) => { setForm({ ...form, amount: Number(e.target.value) }) }} />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Select
                                defaultValue={form.category_id}
                                value={form.category_id}
                                onChange={(category_id) => setForm({ ...form, category_id })}
                            >
                                <Select.Option value={0} disabled>Select a category</Select.Option>
                                {categories.map(category => {
                                    return <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                                })}

                            </Select>
                        </Form.Item>
                    </Form>
                    : mode === "delete" ? <>Are you sure?</>
                        : null}

            </Modal>
        </div>
        <Table loading={loading} columns={columns} dataSource={data} />
    </>

    )
}

export default Record