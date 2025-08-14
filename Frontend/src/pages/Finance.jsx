import SearchBar from "../component/SearchBar";
import MyTable from "../component/Table";

const finance = () => {
    return (
        <div className="doctor_dashboard">
            <div className="table_dashboard">
                <div className="mb-4">
                    <SearchBar />
                </div>
                <MyTable />
            </div>
        </div>
    );
};

export default finance;
