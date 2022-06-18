import SortTable from "./components/SortTable"

function App() {
    const data = [
        { id: 1, name: "Herp", surname: "Perp", age: 31 },
        { id: 2, name: "Xerp", surname: "Eerp", age: 32 },
        { id: 3, name: "Zerp", surname: "Rerp", age: 33 },
        { id: 4, name: "Aerp", surname: "Ferp", age: 34 },
        { id: 5, name: "Eerp", surname: "Terp", age: 1 },
    ]
    return (
        <div className="App">
            <SortTable tableData={data} />
        </div>
    )
}

export default App
