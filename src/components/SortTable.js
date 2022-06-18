import React, { useState } from "react"

const SortTable = ({ tableData }) => {
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState({ col: false, invert: false })

    const headers = React.useMemo(() => {
        return tableData.reduce((prev, curr) => {
            Object.keys(curr).forEach(key => { !prev.includes(key) && prev.push(key)})
            return prev
        }, [])
    }, [tableData])

    const filtered = React.useMemo(() => {
        if(!filter){
            return tableData
        }

        return tableData.filter((row) => Object.values(row).find((cell) => String(cell).includes(filter)))
    }, [filter, tableData])

    const sortBy = React.useCallback((field) => {
        const key = function (x) {
            return String(x[field]).toUpperCase()
        }

        let invert = !sort.invert ? 1 : -1

        return function (a, b) {
            const A = key(a)
            const B = key(b)
            return  invert * ((A > B) - (B > A))
        }
    }, [sort])

    const sorted = React.useMemo(() => sort.col
        ? filtered.sort(sortBy(sort.col))
        : filtered, [filtered, sort.col, sortBy])

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
