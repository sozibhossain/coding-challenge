import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const AddSectors = ({values,setValues}) => {

    const [sectors, setSectors] = useState([])
  

    useEffect(() => {
        fetch('http://localhost:5000/sectors')
        .then(res=>res.json())
        .then(data=>{
            setSectors(data)
        })
    }, [])

    const selectProps = {
        mode: 'multiple',
        style: { width: '100%', minWidth: '200px' },
        values,
        options: sectors,
        onChange: (newValue) => {
        setValues(newValue);
        },
        placeholder: 'Select Items that you are involved in...',
        maxTagCount: 'responsive',
    };

    return (
        <Select 
            required
            labelInValue
            showArrow {...selectProps} 
        />
    );
};

export default AddSectors;