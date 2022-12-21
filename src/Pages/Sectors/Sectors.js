import React, { useState } from 'react';
import AddSectors from '../AddSectors/AddSectors';
import axios from 'axios';
import './Sectors.css';
import { Container } from '@mui/material';



const Sectors = ({children}) => {
    const [checked,setChecked]=useState(false) 
    
    const handleCheck=()=>{
        !checked ? setChecked(true) : setChecked(false)
    }

    const [values,setValues]=useState([])

    const handleSubmit=event=>{
        event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        const selectedItem=values;
        const checkMark=checked;
        const data={
            name:name,
            selectedItem:selectedItem,
            checkMark:checkMark
        }
        console.log(data);
        axios.post('http://localhost:5000/addDocuments', data)
        .then(res =>{
            if(res.data.insertedId){
                alert('post successfully');
                
            }
        })
    }

    return (
        <Container>
            <div className='Sectors-area'>
            <div className="Sectors-form-area">
                <div className="">
                    <div className="">
                        <p>Please enter your name and pick the Sectors you are currently involved in.</p>
                        <form onSubmit={handleSubmit} className="">
                            <div className="">
                                <p>Your Name</p>
                                <input required name='name' type="text" placeholder="Your Name" className="name-fild" />
                            </div>
                            <p>Please select your Sectors.</p>
                            <div className="">
                                <AddSectors values={values} setValues={setValues}></AddSectors>
                            </div>
                            <div className="check-Box">
                                <label className="">
                                    <input name='checkBox' onClick={handleCheck} type="checkbox"  className="" />
                                    <span className="label-text">Agree to terms</span>
                                </label>
                            </div>
                            
                            <button className="submit-btn">Submit</button>
                            
                        </form>
                    </div>
                </div>
            </div>

            <div>
                <main>{children}</main>
            </div>
        </div>
        </Container>
    );
};

export default Sectors;