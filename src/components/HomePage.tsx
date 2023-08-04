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
  useEffect(() => { dispatch(getRecords()) }, [dispatch])
  const token = localStorage.getItem("token");

  const sumIncome = dataIncome.reduce((total, item) => total + item.value, 0);
  const sumExpense = dataExpense.reduce((total, item) => total + item.value, 0);

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
      autoRotate: false,
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
      title: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: "32px",
          fontWeight:"bold" 
        },
        content: '',

      },
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'visible',
          textOverflow: 'ellipsis',
        },
        content: "",

      },
    },
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: "wrap" }}>
      <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '10px' }}>
        <Pie {...config}
          data={token && dataExpense.length ? dataExpense : [{ type: "", value: 0 }]}
          statistic={{
            ...config.statistic,
            title: { ...config.statistic.title, content: "EXPENSE" },
            content: { ...config.statistic.content, content: `${Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(sumExpense)}`
            , style:{...config.statistic.content.style,color:"red"} }
          }}
          loading={loading}
        />
      </div>
      <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '10px' }}>
        <Pie
          {...config}
          data={token && dataIncome.length ? dataIncome : [{ type: "", value: 0 }]}
          statistic={{
            ...config.statistic,
            title: { ...config.statistic.title, content: "INCOME"},
            content: { ...config.statistic.content, content: `${Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(sumIncome)}` 
            , style:{...config.statistic.content.style,color:"green"}}
          }}

          loading={loading}
        />
      </div>
    </div>
  )
}

export default HomePage