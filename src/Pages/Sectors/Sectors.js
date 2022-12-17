import { Button, Container, TextField, } from '@mui/material';
import React, {useState} from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './Sectors.css';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    '----Manufacturing----',
    'Construction materials',
    'Electronics and Optics',
    '---Food and Beverage---',
        'Bakery & confectionery',
        'Bakery & confectionery products',
        'Beverages',
        'Fish & fish products',
        'Meat & meat products',
        'Milk & dairy products',
        'Other',
        'Sweets & snack food',
    '---Furniture---',
        'Bathroom/sauna',
        'Bedroom',
        'Childrenâ€™s room',
        'Kitchen',
        'Living room ',
       'Office ',
       'Other (Furniture)',
        'Outdoor',
        'Project furniture',
    '----Machinery--', 
       'Machinery components',
        'Machinery equipment/tools',
        'Manufacture of machinery',
        '---Maritime---',
            'Aluminium and steel workboats',
            'Boat/Yacht building',
            'Ship repair and conversion',
            'Metal structures',        
            'Other ',       
            'Repair and maintenance service',
    'Metalworking  ',      
        'Construction of metal structures',
        'Houses and buildings ',
        'Metal products', 
        '---Metal works--- ', 
          'CNC-machining ',
            'Forgings, Fasteners', 
           'Gas, Plasma, Laser cutting',
            'MIG, TIG, Aluminum welding ',
   '--Plastic and Rubber--', 
       'Packaging',
        'Plastic goods ',
       '---Plastic processing technology---',
           ' Blowing',
            'Moulding ', 
            'Plastics welding and processing ',
            'Plastic profiles',
    '---Printing--',
        'Advertising ',
        'Book/Periodicals printing',
        'Labelling and packaging printing',
        'Textile and Clothing',
        'Clothing ',
        'Textile',
    '--Wood---',
        'Other (Wood) ',
        'Wooden building materials',
        'Wooden housesOther',
        ' Creative industries',
    '---Other---',
        'Energy technology',
        'Environment ',
    '--Service--', 
        'Business services',
        'Engineering ', 
    '---Information Technology and Telecommunications---',
        'Data processing, Web portals, E-marketing',      
        'Programming, Consultancy',
        'Software, Hardware ',
       'Telecommunications', 
   '---Tourism---',
        'Translation services',
        '---Transport and Logistics---',
            'Air',   
            'Rail ',     
            'Road ',   
            'Water',
];
  
function getStyles(name: '', personName: readonly[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Sectors = ({children}) => {

    const [name, setName] = useState('');
    const [selector, setSelector] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event: SelectChangeEvent) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleNameChange = e =>{
        setName(e.target.value);
    }
    const handleSelectorChange = e =>{
        setSelector(e.target.value);
    }
    const handleCheckboxChange = e =>{
        setCheckbox(e.target.value);
    }

    const resetForm = () => {
        setName("")
        setSelector("")
        setCheckbox("")
      
    }

    const handleSelectorSubmit = e =>{
        const data = {
            name, selector, checkbox
        }
        console.log(data);
        e.preventDefault();

    
        
        axios.post('http://localhost:5000/createpost', data)
        .then(res =>{
            if(res.data.insertedId){
                alert('post successfully');
                resetForm();
            }
        })
        
    } 

    return (
        
            <Container>
                <div  className='Sectors-area'>

                
                    <div className="Sectors-form-area">
                        
                        <p>Please enter your name and pick the Sectors you are currently involved in.</p>
                        <div>
                            <form onSubmit={handleSelectorSubmit}>
                                <TextField
                                    sx={{width: '90%', m: 1}}
                                    id="outlined-size-small"
                                    name="castumerName"
                                    type="name"
                                    onBlur={handleNameChange}
                                    placeholder='Your Name'
                                    size="small"
                                    required
                                />
                                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                                    <Select
                                    multiple
                                    displayEmpty
                                    type="selector"
                                    onBlur={handleSelectorChange}
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                        return <em>Sectors</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    required
                                    >
                                    <MenuItem disabled value="">
                                        <em>Sectors</em>
                                    </MenuItem>
                                    {names.map((name) => (
                                        <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                        >
                                        {name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl><br/>

                                <div className='check-box'>
                                    <Checkbox {...label} type="checkbox" onChange={handleCheckboxChange} /><p>Agree to terms</p>
                                </div>
                                
                                <Button  type="submit" variant="contained">Save</Button>
                            </form>
                        </div>
                    </div>
                    <div className="save-data-area">
                        <main>{children}</main>
                    </div>

                </div>
                
            </Container>
        
    );
};

export default Sectors;