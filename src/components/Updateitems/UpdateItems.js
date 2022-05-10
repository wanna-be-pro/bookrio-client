import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UpdateItems = () => {
    const { id } = useParams();
    const [book, setBoook] = useState({})
    console.log(book);
    useEffect(() => {
        const url = `http://localhost:5000/book/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setBoook(data))


    }, [])
    const handleDelivar = event => {
        if (book.quantity > 0) {
            const quantity = book.quantity - 1
            const updateBook = { quantity }
            console.log(updateBook);

            const url = `http://localhost:5000/book/${id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'

                },
                body: JSON.stringify(updateBook)

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    alert('item  dalivared ')
                    window.location.reload()

                })
        }



    }


    const handleUpdateItem = event => {
        // event.preventDefault()
        const quantity = event.target.quantity.value


        const updateBook = { quantity }
        console.log(updateBook);

        const url = `http://localhost:5000/book/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(updateBook)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('item  quantity updated ')

                event.target.reset()
            })

    }
    return (

        <div className='d-lg-flex d-sm-block m-5 p-5 '>
            <div className=" container">
                <div className="d-lg-flex">
                    <img style={{width:'40%'}} className=' ' src={book.img} alt="" />
                    <div className=" m-3">
                        <h2>Book Name: <span className='text-primary'>{book.name}</span></h2>
                        <h2>price : ${book.price}</h2>
                        <h2>Available items: {book.quantity}</h2>
                        {book.quantity == 0 && <h2 className='text-danger'> item sold</h2>}
                        <h3>Supplyer: {book.supplyer}</h3>
                        <h4>supplyer email: {book.email}</h4>
                    </div>
                </div>
                <p><h5>Book details:</h5> {book.description}</p>



            </div>
            <div className="imput-part container w-50 m-5 mx-auto">

                <Form onSubmit={handleUpdateItem}>

                    <Form.Group className="mb-3" controlId="formBasictext">
                        <Form.Control min="0" required name='quantity' type="number" placeholder="Product Quantity" />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        update
                    </Button>
                    <button onClick={handleDelivar} className='btn my-sm-3 mx-lg-5 btn-primary text-black fw-bold bg-white'>Delivared</button>

                </Form>

            </div>
        </div>

    );
};

export default UpdateItems;