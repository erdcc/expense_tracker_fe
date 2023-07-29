import { Button, Form, Input, Modal, Select, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { CategoryType } from '../types/category';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/actions/categoryActions';
import { AppState } from '../store';
import {SketchPicker} from 'react-color';

type Mode = "new" | "edit"

interface CategoryForm {
  name: string
  type: "income" | "expense"
  color?: string
}
const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black"
}

const Category = () => {
  const { data, loading, error } = useSelector((state: AppState) => state.categories)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm)

  const showModal = (mode: Mode) => {
    setIsModalOpen(true);
    setMode(mode)
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setMode("new")
    setForm(emptyForm)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMode("new")
    setForm(emptyForm)
  };
  const columns: ColumnsType<CategoryType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string, category: CategoryType) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>
      }
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>
        <Modal title={mode === "new" ? "Create New Category" : "Update Category"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form.Item label="Category Name">
            <Input
              name="name"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
          </Form.Item>
          <Form.Item label="Category Type">
            <Select
              defaultValue="expense"
              onChange={(type:CategoryForm["type"]) => setForm({ ...form, type })}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Color"/>
          <SketchPicker 
          onChange={(color)=>setForm({...form,color:color.hex})}/>
        </Modal>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Category