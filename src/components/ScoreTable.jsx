// React imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// MUI component imports
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Collapse, IconButton, CircularProgress } from '@mui/material/'
// MUI icon imports
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonIcon from '@mui/icons-material/Person'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ListAltIcon from '@mui/icons-material/ListAlt'
// Internal image imports
import WonderImage from '../assets/images/scores/tiny/wonder-tiny.png'
import TreasuryImage from '../assets/images/scores/tiny/treasury-tiny.png'
import MilitaryImage from '../assets/images/scores/tiny/military-tiny.png'
import CivilianImage from '../assets/images/scores/tiny/civilian-tiny.png'
import CommercialImage from '../assets/images/scores/tiny/commercial-tiny.png'
import ScienceImage from '../assets/images/scores/tiny/science-tiny.png'
import GuildImage from '../assets/images/scores/tiny/guild-tiny.png'
import CityImage from '../assets/images/scores/tiny/city-tiny.png'
import LeaderImage from '../assets/images/scores/tiny/leader-tiny.png'
import NavalImage from '../assets/images/scores/tiny/naval-tiny.png'
import IslandImage from '../assets/images/scores/tiny/island-tiny.png'

// Score category-images
const categoryImageMap = {
    Wonder: WonderImage,
    Treasury: TreasuryImage,
    Military: MilitaryImage,
    Civilian: CivilianImage,
    Commercial: CommercialImage,
    Science: ScienceImage,
    Guild: GuildImage,
    City: CityImage,
    Leader: LeaderImage,
    Naval: NavalImage,
    Island: IslandImage,
}

// Scoreboard-rows
function Row({ row }) {

    // Open state
    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>

            {/* Player-row */}
            <TableRow>

                {/* Player name-text */}
                <TableCell align='left'>
                    {row.player}
                </TableCell>

                {/* Final scores-text */}
                <TableCell align='center'>
                    <strong>{row.finalScores}</strong>
                </TableCell>

                {/* All scores-button */}
                <TableCell align='right'>
                    <IconButton
                        aria-label={open ? 'Collapse row' : 'Expand row'}
                        size='small'
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* All scores-collapsed row */}
            <TableRow>
                <TableCell
                    colSpan={3}
                    sx={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        border: open ? '' : 'none',
                    }}>
                    <Collapse
                        in={open}
                        timeout='auto'
                        unmountOnExit>
                        <Box
                            sx={{
                                margin: 1,
                                marginBottom: 2.5,
                            }}>

                            {/* All scores-table */}
                            <Table
                                size='small'
                                sx={{
                                    // Large screen
                                    '@media (min-width: 400px)': {
                                        maxWidth: '80%',
                                        marginX: 'auto',
                                    },
                                }}>
                                <TableBody>

                                    {/* Score-row */}
                                    {Object.keys(categoryImageMap).map((key) => (
                                        row[key] !== undefined && (
                                            <TableRow key={key}>

                                                {/* Score category */}
                                                <TableCell
                                                    align='left'
                                                    sx={{
                                                        width: '80%',
                                                    }}>
                                                    <img
                                                        src={categoryImageMap[key]}
                                                        alt={key}
                                                        style={{
                                                            maxWidth: 40,
                                                            marginRight: 20,
                                                            height: 'auto',
                                                            verticalAlign: 'middle',
                                                        }} />
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </TableCell>

                                                {/* Score */}
                                                <TableCell
                                                    align='right'
                                                    sx={{
                                                        width: '20%',
                                                    }}>
                                                    <strong>{row[key]}</strong>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

// Prop types
Row.propTypes = {
    row: PropTypes.shape({
        player: PropTypes.string.isRequired,
        finalScores: PropTypes.number.isRequired,
        wonder: PropTypes.number,
        treasury: PropTypes.number,
        military: PropTypes.number,
        civilian: PropTypes.number,
        commercial: PropTypes.number,
        science: PropTypes.number,
        guild: PropTypes.number,
        city: PropTypes.number,
        leader: PropTypes.number,
        naval: PropTypes.number,
        island: PropTypes.number,
    }).isRequired,
}

export default function CollapsibleTable({ rows = [], loading }) {

    return (
        <>
            <Table
                sx={{
                    maxWidth: '95%',
                    marginX: 'auto',
                    marginTop: 1,
                }}>

                {/* Title-row */}
                <TableHead>
                    <TableRow>

                        {/* Player name-title */}
                        <TableCell align='left'>
                            <PersonIcon
                                sx={{
                                    marginLeft: 1,
                                }} />
                            <br />
                            Player
                        </TableCell>

                        {/* Final scores-title */}
                        <TableCell align='center'>
                            <EmojiEventsIcon />
                            <br />
                            Final Scores
                        </TableCell>

                        {/* All scores-title */}
                        <TableCell align='right'>
                            <ListAltIcon
                                sx={{
                                    marginRight: 2,
                                }} />
                            <br />
                            All Scores
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* Table-content */}
                <TableBody>

                    {/* Loading data */}
                    {loading ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                align='center'>
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (

                        // No data
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                align='center'>
                                No data available
                            </TableCell>
                        </TableRow>
                    ) : (

                        // Loaded data
                        rows.map((row, index) => <Row key={`${row.player}-${index}`} row={row} />)
                    )}
                </TableBody>
            </Table>
        </>
    )
}
