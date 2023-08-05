import { Pie } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { useEffect, useState } from "react";
import { getRecords } from "../store/actions/recordAction";
import { DatePicker, DatePickerProps } from "antd";

const HomePage = () => {
  const { RangePicker } = DatePicker;
  const { data: recordData, loading } = useSelector((state: AppState) => state.records)
  const dispatch = useDispatch<any>()

  //data
  const [selectedDate,setSelectedDate]=useState(new Date())
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setSelectedDate(date!.toDate())
  };
  const dataExpense = recordData.filter(record => record.category.type === "expense").map(record => {
    const type = record.title
    const value = record.amount
    return ({ type, value })
  })
  const dataIncome = recordData.filter(record => record.category.type === "income")
    .filter(record => {
      const recordMonth = new Date(record.createdAt).getMonth()
      return recordMonth === selectedDate.getMonth();
    })
    .map(record => {
      const type = record.title
      const value = record.amount
      return ({ type, value })
    })
  useEffect(() => { dispatch(getRecords()) }, [dispatch])

  //token
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const tokenExpiration = tokenData.exp * 1000;
      if (Date.now() > tokenExpiration) {
        localStorage.removeItem('token');
      }
    }
  })

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
      {type: 'element-selected',},
      {type: 'element-active',},
    ],
    statistic: {
      title: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: "32px",
          fontWeight: "bold"
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

      <div style={{ flex: '0 0 50%', maxWidth: '40%', paddingTop: '10px' }}>
        <Pie {...config}
          data={token && dataExpense.length ? dataExpense : [{ type: "", value: 0 }]}
          statistic={{
            ...config.statistic,
            title: { ...config.statistic.title, content: "EXPENSE" },
            content: {
              ...config.statistic.content, content: `${Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(sumExpense)}`,
              style: { ...config.statistic.content.style, color: "red" }
            }
          }}
          loading={loading}
          legend={false}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: '20%', textAlign: "center", paddingTop: "10px", justifyContent:"center" }}>
        <p style={{ fontSize: 36, fontWeight: "bold", color: "#001aff" }}>{selectedDate.toLocaleString('default', { month: 'long' }).toUpperCase()}</p>
        <DatePicker onChange={onChangeDate} picker="month" size="large" format={"MM/YYYY"} />
        <p style={{paddingTop:"10px"}}> OR </p>
        <RangePicker size="large" format={"DD/MM/YYYY"}/>
      </div>

      <div style={{ flex: '0 0 50%', maxWidth: '40%', paddingTop: '10px' }}>
        <Pie
          {...config}
          data={token && dataIncome.length ? dataIncome : [{ type: "", value: 0 }]}
          statistic={{
            ...config.statistic,
            title: { ...config.statistic.title, content: "INCOME" },
            content: {
              ...config.statistic.content, content: `${Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(sumIncome)}`,
              style: { ...config.statistic.content.style, color: "green" }
            }
          }}
          loading={loading}
          legend={false}
        />
      </div>
    </div>
  )
}

export default HomePage