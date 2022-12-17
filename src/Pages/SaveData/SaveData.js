import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import './SaveData.css';

const SaveData = () => {
    const [saveSectors, setSaveSectors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/createpost')
            .then(res => res.json())
            .then(data => setSaveSectors(data));
    }, []);


    const handleDelete = id => {
        const url = `http://localhost:5000/createpost/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount){
                alert('deleted')
                const remaining = saveSectors.filter(createposts => createposts._id !==id)
                setSaveSectors(remaining)
            }
        })
    }

    return (
        <div className='save-data'>
            {
                saveSectors.map((saveSectors, index) => (
                    <div className='savedata-area'>
                        <div className='savedata-name-btn'>
                            <div>
                            <h4> Your Name: {saveSectors.name}</h4>
                            </div>
                            <div>
                                <Button onClick={() => handleDelete(saveSectors._id)}>x</Button>
                            </div>
                        </div>
                        
                        <div className='savedata-sectors'>
                        <h4>Your sectors :</h4>
                        {
                            saveSectors.selector.map((sectors, index) => (
                                <ul><li>{sectors}</li></ul>
                            ))
                        }  
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default SaveData;