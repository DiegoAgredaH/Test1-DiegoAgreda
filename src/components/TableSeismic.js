import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

export default function EventosSismicos() {

    const [data, setData] = useState([]);

    const [term, setTerm] = useState('');

    const getData = async () => {

        const dataSGC = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson');
        const { features } = await dataSGC.json();
        setData(features)

    }

    function searchingTerm(term) {
        return function (x) {
            const termLower = term.toLowerCase()
            const xLower = x.properties.place.toLowerCase()
            return xLower.includes(termLower) || !termLower;
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>

            <div className="col-lg-3 col-md-6 col-sm-12">
                <br />
                <TextField align="left" id="outlined-search" label="Place" type="search" variant="outlined"
                    onChange={(e) => setTerm(e.target.value)}></TextField>
                <br /><br />

            </div>

            <TableContainer component={Paper}>
                <Table className=" table table-striped table-bordered table-hover" aria-label="simple table">
                    <TableHead>
                        <TableRow className="table-success">
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Mag</TableCell>
                            <TableCell align="right">Place</TableCell>
                            <TableCell align="right">LocalTime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(searchingTerm(term)).map((row) => (
                            <TableRow key={row.id} >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.properties.status}</TableCell>
                                <TableCell align="right">{row.properties.type}</TableCell>
                                <TableCell align="right">{row.properties.mag}</TableCell>
                                <TableCell align="right">{row.properties.place}</TableCell>
                                <TableCell align="right">{moment(row.properties.time).format('YYYY[-]MM[-]DD[ ]h:mm')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

