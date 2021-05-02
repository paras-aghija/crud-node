import React, {useState} from 'react'
import './Item.css'
import Axios from 'axios'

function Item({movieName, movieReview}) {

    const [updateField, setUpdateField] = useState('')

    const deleteReview = () => {
        // console.log(`http://localhost:3001/api/delete/${movieName}`)
        Axios.delete(`http://localhost:3001/api/delete/${movieName}`)
    }

    const updateReview = () => {
        Axios.put(`http://localhost:3001/api/update/`, {
            movieName: movieName,
            movieReview: updateField
        })
        setUpdateField("")
        
    }
    return (
        <div className="item">
            <div className="container">
                <div className="property">
                    <h2>Movie Name : {movieName}</h2>
                </div>
                <div className="property">
                    <h2>Movie Review : {movieReview}</h2>
                </div>
                
            
                <div className="lower">
                    <button className="delete" onClick={deleteReview}><span>DELETE</span></button>   
                    
                        <input type="text" className="updateField" onChange={(e) => {
                            setUpdateField (e.target.value)
                        }}/>
                        <button className="update" onClick={updateReview}>Update</button>
                 
                </div>
            </div> 
        </div>
    )
}

export default Item