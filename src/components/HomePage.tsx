import { Pie } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { useEffect } from "react";
import { getRecords } from "../store/actions/recordAction";
import { title } from "process";

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

  const configExpense = {
    appendPadding: 10,
    data: dataExpense,
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
  }; const configIncome = {
    appendPadding: 10,
    data: dataIncome,
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
        content: 'INCOME',
      },
    },
  };
  return (

    <div style={{
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "10px"
    }}>
      <Pie {...configExpense} loading={loading} />
      <Pie {...configIncome} loading={loading} /></div>

  )
}

export default HomePage