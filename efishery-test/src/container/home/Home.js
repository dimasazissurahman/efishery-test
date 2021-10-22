import { useEffect, useState } from "react"
import { getDataList } from "../../api/Api"
// import styles from './Home.module.css';
import './Home.scss';
import { HeaderPage } from "../../component/Header";

export const Home = () => {
    const [data, setData] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [optionCityAreaList, setOptionCityAreaList] = useState([]);
    const [optionProvinceAreaList, setOptionProvinceAreaList] = useState([]);
    const [optionSizeList, setOptionSizeList] = useState([]);
    const [cityValue, setCityValue] = useState("");
    const [provinceValue, setProvinceValue] = useState("");
    const [sizeValue, setSizeValue] = useState("");
    const [komoditasValue, setKomoditasValue] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [editPrice, setEditPrice] = useState(false);
    const [addPrice, setAddPrice] = useState("");
    const [selectId, setSelectId] = useState();

    const getData = async () => {
        let resp = await getDataList('list');
        if (resp.status === 200) {
            const filterData = resp.data.filter(item => item.uuid);
            console.log(filterData);
            setIsSearch(false);
            const filterDataByProvince = provinceValue ? filterData.filter(item => provinceValue.includes(item.area_provinsi)) : filterData;
            const filterDataByCity = cityValue ? filterDataByProvince.filter(item => cityValue.includes(item.area_kota)) : filterDataByProvince;
            const filterDataBySize = sizeValue ? filterDataByCity.filter(item => sizeValue.includes(item.size)) : filterDataByCity;
            const filterDataByKomoditas = komoditasValue ? filterDataBySize.filter(item => komoditasValue.includes(item.komoditas)) : filterDataBySize;
            const filterDataByPrice = priceValue ? filterDataByKomoditas.filter(item => priceValue.includes(item.price)) : filterDataByKomoditas;
            console.log(filterDataByPrice);
            setData(filterDataByPrice);
        }
        else {
            alert("Error");
        }
    };

    const getDataOption = async () => {
        let resp = await getDataList('option_area');
        let respSize = await getDataList('option_size');
        if (resp.status === 200 && respSize.status === 200) {
            console.log(respSize.data);
            const city = resp.data.map((data, i) => data.city);
            const province = resp.data.map((data, i) => data.province);
            const size = respSize.data.map((data, i) => data.size);
            setOptionCityAreaList(city);
            setOptionProvinceAreaList(province);
            setOptionSizeList(size);
        }
        else {
            alert("Error");
        }
    }
    useEffect(() => {
        getDataOption();
    }, []);
    useEffect(() => {
        if (isSearch === true) {
            console.log("kesini");
            getData();
        }
    }, [isSearch]);


    const handleSearch = () => {
        setIsSearch(true);
    }

    const handleReset = () => {
        setSizeValue("");
        setPriceValue("");
        setCityValue("");
        setProvinceValue("");
        setKomoditasValue("");
    }

    const handleEdit = (i) => {
        setSelectId(i);
        setEditPrice(true);
        const select = data.filter((key, el) => el === i);
        setAddPrice(select[0].price);
    }

    const handleAdd = () => {
        setData([...data, data[selectId].price = addPrice]);
        setEditPrice(false);
    }


    console.log(selectId);
    return (
        <>
            <HeaderPage />
            <div className={'container'}>
                <div className={'box'}>
                    <h3>Filter Parameter Search : </h3>
                    <div className={'form'}>
                        <label>Area Provinsi</label>
                        <input list={"provinsi"} name={"provinsi"} placeholder={"Pilih Provinsi"} onChange={(e) => setProvinceValue(e.target.value)} value={provinceValue} />
                        <datalist id={"provinsi"}>
                            {optionProvinceAreaList.map((data, i) => (
                                <option key={i}>{data}</option>
                            ))}
                        </datalist>
                        <label>Area Kota</label>
                        <input list={"kota"} name={"kota"} placeholder={"Pilih Kota"} onChange={(e) => setCityValue(e.target.value)} value={cityValue} />
                        <datalist id={"kota"}>
                            {optionCityAreaList.map((data, i) => (
                                <option key={i}>{data}</option>
                            ))}
                        </datalist>
                        <label>Size</label>
                        <input list={"size"} name={"size"} placeholder={"Pilih Size"} onChange={(e) => setSizeValue(e.target.value)} value={sizeValue} />
                        <datalist id={"size"}>
                            {optionSizeList.map((data, i) => (
                                <option key={i}>{data}</option>
                            ))}
                        </datalist>
                        <label>Komoditas</label>
                        <input name={"komoditas"} placeholder="Cth: Baronang" onChange={(e) => setKomoditasValue(e.target.value)} value={komoditasValue} />
                        <label>Price</label>
                        <input name={"price"} placeholder="Cth: 20000" onChange={(e) => setPriceValue(e.target.value)} value={priceValue} />
                        <div className={"flex"}>
                            <button onClick={() => handleSearch()}>Search</button>
                            <button onClick={() => handleReset()}>Reset</button>
                        </div>
                        {editPrice ?
                            <>
                                <h3>Change Data : </h3>
                                <div className={'form'}>
                                    <label>Add Price</label>
                                    <input name={"add-price"} onChange={(e) => setAddPrice(e.target.value)} value={addPrice} />
                                </div>
                                <button onClick={() => handleAdd()}>Add</button>
                            </>
                            : ""}
                    </div>
                </div>
                <table className="box responsive">
                    <thead>
                        <tr>
                            <th>Area Provinsi</th>
                            <th>Area Kota</th>
                            <th>Komoditas</th>
                            <th>Price</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td data-header="Area Provinsi">{data.area_provinsi}</td>
                                    <td data-header="Area Kota">{data.area_kota}</td>
                                    <td data-header="Komoditas">{data.komoditas}</td>
                                    <td data-header="Price">{data.price} {editPrice === false ? <span onClick={() => handleEdit(i)}>Edit</span> : ""}</td>
                                    <td data-header="Size">{data.size}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}