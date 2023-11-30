import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface propsType {
    title : string,
    name : string,
    label : string,
    value : string,
    onChange : (e: React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent<string>) => void,
    options : dropwDownOption[]
}

export default function DropDownForm({title, label, name, value, onChange, options} : propsType) {
    return (
        <div className="flex flex-col ">
            <strong className="text-base pb-3">{title}</strong>
            <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    name={name}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={onChange}
                >
                {
                    options.map((item,index)=>{
                        return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        )
                    })
                }
                </Select>
            </FormControl>
        </div>
    )
}
