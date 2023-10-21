import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    div, Typography,IconButton
} from "@material-tailwind/react";
function Main() {
    const [open, setOpen] = useState(false);
    const [details, setdetails] = useState({})
    const [alldetails, setalldetails] = useState([]);
    const [display,setdisplay] = useState([]);
    const [editdetail,seteditdetail] = useState({});
    const [ name,setname] = useState('');
    const [phone,setphone] = useState('');
    const [address,setaddress] = useState('');
    const [gender,setgender] = useState('');
    const [language,setlanguage] = useState('');
    const [photo, setphoto] = useState('');
    const [openedit,setopenedit] = useState(false)
    const handleOpen = () => setOpen(!open);
    const handleeditopen = () => setopenedit(!openedit);
    const TABLE_HEAD = ['NAME', 'PHONE', 'ADDRESS', 'PHOTO', 'GENDER', 'LANGUAGE', 'ACTION'];

    function changehandler(e) {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }
    function submithandler ()  {
        setalldetails([...alldetails, details]);
        setdisplay([...display,details]);
        setphoto('');

    }
    function deletehandler(d){
        setdisplay(display.filter((details) => details !== d));
    }
    function uploadphoto(e) {
        setphoto(URL.createObjectURL(e.target.files[0]));
        setdetails({ ...details, [e.target.name]: URL.createObjectURL(e.target.files[0]) });

    }
    function filterdisplay (e){
        var f = document.getElementById('find').value.toLowerCase();
        var g = document.getElementById('gender').value;
        var l = document.getElementById('language').value;
        setdisplay(alldetails.filter((detail)=>{
            const {NAME, PHONE,ADDRESS, GENDER,LANGUAGE} = detail;
            if(g !== 'All Gender' && l!== 'All Languages')
            {
                return (
                   (GENDER === g) && (LANGUAGE === l) && (NAME.toLowerCase().includes(f) || PHONE.toLowerCase().includes(f) || ADDRESS.toLowerCase().includes(f)  )
                 )
            }
            else 
            {
                if(g === 'All Gender' && l === 'All Languages'){
                    return  ( NAME.toLowerCase().includes(f) || PHONE.toLowerCase().includes(f) || ADDRESS.toLowerCase().includes(f) ) 
                }
                else if(g === 'All Gender'){
                  return (  ( NAME.toLowerCase().includes(f) || PHONE.toLowerCase().includes(f) || ADDRESS.toLowerCase().includes(f) )  && (LANGUAGE === l))
                }
                else
                {
                 return (  ( NAME.toLowerCase().includes(f) || PHONE.toLowerCase().includes(f) || ADDRESS.toLowerCase().includes(f) ) && (GENDER === g))
                }
            }
            
        }))

    }

    function edit(d){
        seteditdetail(d);
        setname(d.NAME);
        setaddress(d.ADDRESS);
        setphone(d.PHONE);
        setphoto(d.PHOTO)
        setgender(d.GENDER);
        setlanguage(d.LANGUAGE);
        setdetails(d);
        handleeditopen();
    }
    function savehandler() {
        // Create a copy of the details array
        const updatedDetails = [...alldetails];
        const indexToEdit = updatedDetails.findIndex((d) => d === editdetail);
        updatedDetails[indexToEdit] = details;
        const updatedDisplay = updatedDetails.filter((d) =>{if(details !== editdetail){return d !== editdetail} else {return true}});
          setalldetails(updatedDisplay);
          setdisplay(updatedDisplay);
          setname('');
          setphone('');
          setaddress('');
          setphoto('');
          setgender('');
          setlanguage('');
      
          handleeditopen();
        }
      
      

    return (
        <>
            <Button onClick={handleOpen} variant="gradient" className='ml-[85%]'>
                CREATE YOUR DETAILS
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>CREATE YOUR DETAILS</DialogHeader>

                <DialogBody className='bg-white text-black text-sm'>
                    <label className='flex mt-5'>NAME : <input type='text' required className=' border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[85%]' name='NAME' onChange={changehandler} /></label>
                    <label className='flex mt-5'>PHONE: <input type='number' required className='border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[85%]' name='PHONE' onChange={changehandler} /></label>
                    <label className='flex mt-5 '>ADDRESS : <textarea name='ADDRESS' required className='border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[80%]' rows={1} cols={35} onChange={changehandler}></textarea></label>
                    <label className='flex mt-5'>PHOTO :
                        {photo ?
                            <div class=" border border-slate-500 rounded-md ml-5">
                                <span className='text-black' onClick={()=>{
                                    setphoto('');
                                    setdetails({ ...details, ['PHOTO']: '' })
                                }}>×</span>
                                <img src={photo} alt='photo' className='w-12 h-12' />
                            </div>
                            :
                            <div class="text-center border border-slate-500 rounded-md ml-5 w-[85%]">
                                <svg class="mx-auto h-12 w-12 text-gray-300  hover:text-indigo-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                </svg>
                                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label for="PHOTO" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none   hover:text-indigo-500">
                                        <input name="PHOTO" type="file" class="sr-only" onChange={uploadphoto} />
                                    </label>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        }
                    </label>

                    <label className='flex mt-5 '>
                        GENDER : <input type='radio' name='GENDER' value={"Male"} onChange={changehandler} className='ml-2 mr-1' /> Male
                        <input type='radio' name='GENDER' value={"Female"} onChange={changehandler} className='ml-2 mr-1' /> Female
                    </label>
                    <label className='flex mt-5'>LANGUAGE :
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English'} /> English
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'Gujarati'} />
                        Gujarati
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English, Gujarati'} />
                        Both
                    </label>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>CANCEL</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => { submithandler(); handleOpen(); }} type='submit'>
                        SUBMIT
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={openedit} handler={handleeditopen}>
                <DialogHeader>EDIT YOUR DETAILS</DialogHeader>

                <DialogBody className='bg-white text-black'>
                    <label className='flex mt-5'>NAME : <input type='text' required className='border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[85%]' name='NAME' onChange={changehandler} defaultValue={name} /></label>
                    <label className='flex mt-5'>PHONE NUMBER : <input type='number' required className='border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[85%]' name='PHONE' onChange={changehandler} defaultValue={phone} /></label>
                    <label className='flex mt-5 '>ADDRESS : <textarea name='ADDRESS' required className='border-b border-b-gray-400 focus:border-b-black focus:outline-none ml-3 w-[80%]' rows={1}  onChange={changehandler} defaultValue={address}></textarea></label>
                    <label className='flex mt-5'>PHOTO :
                        {photo ?
                            <div class=" border border-slate-500 rounded-md ml-5">
                                <span className='text-black' onClick={()=>{
                                    setphoto('');
                                    setdetails({ ...details, ['PHOTO']: '' })
                                }}>×</span>
                                <img src={photo} alt='photo' className='w-12 h-12' />
                            </div>
                            :
                            <div class="text-center border border-slate-500 rounded-md ml-5 w-[85%]">
                                <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                </svg>
                                <div class="mt-4 flex text-sm leading-6 text-gray-600  hover:text-indigo-500">
                                    <label for="PHOTO" class="relative cursor-pointer rounded-md bg-white font-semibold text-gray-500 focus-within:outline-none ">
                                        <input name="PHOTO" type="file" class="sr-only" onChange={uploadphoto} />
                                    </label>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        }
                    </label>

                    <label className='flex mt-5 '>
                        GENDER : { gender==='Male' ?<div><input type='radio' name='GENDER' value={"Male"} onChange={changehandler} className='ml-2 mr-1' defaultChecked/> Male
                                <input type='radio' name='GENDER' value={"Female"} onChange={changehandler} className='ml-2 mr-1' /> Female</div>  :
                              <div>  <input type='radio' name='GENDER' value={"Male"} onChange={changehandler} className='ml-2 mr-1'/> Male
                                <input type='radio' name='GENDER' value={"Female"} onChange={changehandler} className='ml-2 mr-1' defaultChecked/> Female </div>
                                }
                    </label>
                    <label className='flex mt-5' >LANGUAGE :
                    { language === 'English' ?
                       <div> <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English'} defaultChecked /> English
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'Gujarati'} /> Gujarati
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English, Gujarati'} /> Both</div> :
                        language === 'Gujarati' ? 
                        <div> <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English'} /> English
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'Gujarati'} defaultChecked /> Gujarati
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English, Gujarati'} /> Both</div> :
                        <div> <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English'} /> English
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'Gujarati'} /> Gujarati
                        <input type='checkbox' className=' border border-slate-500 rounded-md focus:border-sky-500 ml-2 mr-2' name='LANGUAGE' onChange={changehandler} value={'English, Gujarati'} defaultChecked/> Both</div>

}
                       
                    </label>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleeditopen}
                        className="mr-1"
                    >
                        <span>CANCEL</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => { savehandler(); handleeditopen(); }} type='submit'>
                        SAVE
                    </Button>
                </DialogFooter>
            </Dialog>
            <div className='border border-black rounded-xl m-10'>
            <div className="h-[90%] w-[90%] ml-11 mt-3 bg-white">

                <div className='text-xl mb-9 ml-4'>Details-Table</div>
                <div className='flex'>
                <label className='mr-5 mb-5 ml-5'>Find :- <input type='text' id='find' name='find' onChange={filterdisplay} className='border-b border-b-gray-400 focus:border-b-2 border-black focus:outline-none ml-3'/></label> 
                <select name='selectgender' id='gender' onChange={filterdisplay} className='mr-5 mb-5'>
                    <option selected  >All Gender</option>
                    <option>Male</option>
                    <option> Female </option>
                </select>
                <select name='selectlanguages' id='language' onChange={filterdisplay} className='mr-5 mb-5'>
                    <option selected>All Languages</option>
                    <option>English</option>
                    <option>Gujarati</option>
                    <option>English, Gujarati</option>
                </select>
                </div>
                <table className="table-auto text-center w-[100%]">
                    <thead>
                        <tr>
                            <th></th>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-white p-4">
                                    <Typography
                                        variant="small"
                                        className="font-normal leading-none text-black"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {display.map((detail, index) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <IconButton variant="outlined" className="rounded-full bg-pink-700 mr-5 text-white">
                                    {detail.NAME[0]}
                                        </IconButton></td>
                                <td >
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                    
                                        {detail.NAME}
                                    </Typography>
                                </td>
                                <td> <Typography variant="small" color="blue-gray" className="font-normal">
                                    {detail.PHONE}
                                </Typography></td>
                                <td> <Typography variant="small" color="blue-gray" className="font-normal">
                                    {detail.ADDRESS}
                                </Typography></td>
                                <td>
                                    <Typography variant="small" className="font-normal">
                                        <img src={detail.PHOTO} alt='PHOTO' className='w-10 h-10 ml-9' />
                                    </Typography>
                                </td>
                                <td><Typography variant="small" color="blue-gray" className="font-normal">
                                    {detail.GENDER}
                                </Typography></td>
                                <td>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {detail.LANGUAGE}
                                    </Typography>
                                </td>
                                <td className='flex place-content-center'>
                                    <Button className='bg-blue-900 text-xs' onClick={()=>{edit(detail)}}>EDIT</Button>
                                    <Button className=' bg-red-900 ml-3 text-xs' onClick={()=>{deletehandler(detail)}} >DELETE</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
}

export default Main
