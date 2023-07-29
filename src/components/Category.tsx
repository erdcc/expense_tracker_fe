import { Button, Form, Input, Modal, Select, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { CategoryForm, CategoryType } from '../types/category';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../store/actions/categoryActions';
import { AppState } from '../store';
import { SketchPicker } from 'react-color';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Mode } from '../types/general';

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
  const [updateId, setUpdateId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const showModal = (mode: Mode) => {
    setIsModalOpen(true);
    setMode(mode)
  };

  const handleOk = () => {
    if (mode === "new") dispatch(addCategory(form))
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateCategory(form, updateId))
    else if(mode==="delete" && typeof deleteId ==="number")
      dispatch(deleteCategory(deleteId))
    dispatch(addCategory(form))
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
    {
      title: 'Action',
      key: 'action',
      render: (text: string, category: CategoryType) => (
        <Space size="middle">
          <EditFilled style={{ color: "#0077ff" }}
            onClick={() => {
              showModal("edit")
              setForm(category)
              setUpdateId(category.id)
            }} />
          <DeleteFilled style={{ color: "#c90000" }}
            onClick={() => {
              showModal("delete")
              setDeleteId(category.id)
            }
            } />
        </Space>
      ),
    },
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
        <Modal title={mode === "new" ? "Create New Category" : mode==="edit"?"Update Category":"Delete Category"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: !(mode==="delete")&&!form.name }}>
          {mode === "edit" || mode==="new" ?
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Category Name" required>
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select
                  defaultValue="expense"
                  value={form.type}
                  onChange={(type: CategoryForm["type"]) => setForm({ ...form, type })}
                >
                  <Select.Option  value="income">Income</Select.Option>
                  <Select.Option  value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                <SketchPicker
                  color={form.color}
                  onChange={(color) => setForm({ ...form, color: color.hex })} />
              </Form.Item>
            </Form>
            : mode === "delete" ? <>Are you sure?</>
              : null}

        </Modal>
      </div>

      <Table loading={loading} columns={columns} dataSource={data} rowKey="id"/>
    </>
  )
}

export default Category