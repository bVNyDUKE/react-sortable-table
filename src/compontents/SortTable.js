import React, { useState } from "react"

const SortTable = ({ tableData }) => {
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState({ col: false, invert: false })

    const headers = tableData.reduce((prev, curr) => {
        for (let key in curr) {
            if (!prev.includes(key)) {
                prev.push(key)
            }
        }
        return prev
    }, [])

    const filtered =
        filter === ""
            ? tableData
            : tableData.filter((x) => {
                  let flag = false
                  for (let key in x) {
                      if (String(x[key]).search(filter) !== -1) {
                          flag = true
                      }
                  }
                  return flag
              })

    const sortBy = (field, invert) => {
        const key = function (x) {
            return String(x[field]).toUpperCase()
        }

        invert = !invert ? 1 : -1

        return function (a, b) {
            return (a = key(a)), (b = key(b)), invert * ((a > b) - (b > a))
        }
    }
    const sorted = sort.col
        ? filtered.sort(sortBy(sort.col, sort.invert))
        : filtered

    function headerClick(col) {
        setSort((prev) => {
            if (prev.col === col) {
                const newState = { ...prev, invert: !prev.invert }
                return newState
            }
            const newState = { ...prev, col: col }
            return newState
        })
    }

    return (
        <>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            ></input>
            <table>
                <thead>
                    <tr>
                        {headers.map((x) => (
                            <th onClick={() => headerClick(x)}>{x}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((x) => (
                        <tr key={x.id}>
                            {headers.map((y) => (
                                <td>{x[y]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SortTable
