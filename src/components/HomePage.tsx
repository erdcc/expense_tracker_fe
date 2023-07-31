import { Pie } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { useEffect } from "react";
import { getRecords } from "../store/actions/recordAction";

const HomePage = () => {
  const { data: recordData, loading } = useSelector((state: AppState) => state.records)
  const dispatch = useDispatch<any>()
  const dataExpense = recordData.filter(record => record.category.type === "expense").map(record => {
    const type = record.title
    const value = record.amount
    return ({ type, value })
  })
  const dataIncome = recordData.filter(record => record.category.type === "income").map(record => {
    const type = record.title
    const value = record.amount
    return ({ type, value })
  })
  useEffect(() => { dispatch(getRecords()) }, [])

  const config = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'EXPENSE',
      },
    },
  };
  return (

    <div style={{
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "10px"
    }}>
      <Pie {...config} data={dataExpense} statistic={{content:{content:"EXPENSE"}}} loading={loading} />
      <Pie {...config} data={dataIncome} statistic={{content:{content:"INCOME"}}}loading={loading} /></div>

  )
}

export default HomePage