import {Box, Grid, Grow} from "@mui/material";
import Card from "./Card/Card";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import React, {useEffect, useState} from "react";
import Folder from "./Folder/Folder";


export default function FavouriteDndCourses(){

    const courses = [
        {
            id: '1',
            title: 'Start with',
            topic: 'HTML',
            tag: 'Self Placed',
        },
        {
            id: '2',
            title: 'Start with',
            topic: 'CSS',
            tag: 'Self Placed',
        },
        {
            id: '3',
            title: 'Start with',
            topic: 'Js',
            tag: 'Self Placed',
        },
        {
            id: '4',
            title: 'Start with',
            topic: 'React',
            tag: 'Self Placed',
        },
        {
            id: '5',
            title: 'Start with',
            topic: 'Angular',
            tag: 'Self Placed',
        },
        {
            id: '6',
            title: 'Start with',
            topic: 'Node Js',
            tag: 'Self Placed',
        },
        {
            id: '7',
            title: 'Start with',
            topic: 'Express',
            tag: 'Self Placed',
        },
        {
            id: '8',
            title: 'Start with',
            topic: 'Git',
            tag: 'Self Placed',
        },
        {
            id: '9',
            title: 'Start with',
            topic: 'Vue Js',
            tag: 'Self Placed',
        },
        {
            id: '10',
            title: 'Start with',
            topic: 'Design',
            tag: 'Self Placed',
        },
        {
            id: '11',
            title: 'Start with',
            topic: 'JQuery',
            tag: 'Self Placed',
        },
        {
            id: '12',
            title: 'Start with',
            topic: 'SASS',
            tag: 'Self Placed',
        },

    ];
    const [data, setData] = useState([]);
    const [dropped, setDropped] = useState([]);
    const [isDrag, setIsDrag] = useState(false);
    const [dragId, setDragId] = useState('')
    const [hover, setHover] = useState(false)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setData(courses)
    }, [])

    const onMouseEnterHandler = () => {
        setHover(true)
    }
    const onMouseLeaveHandler = () => {
        setHover(false)
    }

    const handleDragStart = (result) => {
        setDragId(result.draggableId)
        setIsDrag(true)
    }

    const handleDragEnd = (result) => {
        if(result.destination && result.destination.droppableId === 'character'){
            const element = data.filter(e => e.id === result.draggableId)
            dropped.push(element);
            setData(data.filter(each => each.id !== result.draggableId));
            setTotal(total + 1);
        }
        setIsDrag(false)
        // console.log(result);
    }


    return(
        <>
            <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <Box bgcolor={'#101216'} mt={9} width={'100%'} color={'#FFF'} sx={{overflowY: 'hidden'}}>
                    <Grid container spacing={2}>
                        <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                            <Box height={'100%'} fontWeight={600} p={4} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'}>
                                <Box fontSize={'22px'} mb={0.5} sx={{
                                    transform: !isDrag ? 'translate(0, 160px)' : 'translate(0, 0)',
                                    transition: 'transform 0.2s'
                                }}>
                                    Drop the favorite course in folder
                                </Box>
                                <Box fontSize={'22px'} mb={0.5} sx={{
                                    // transform: isDrag ? 'translate(0, 0)' : '',
                                    display: isDrag ? 'none' : '',
                                    transition: 'display 0.1s'
                                }}>
                                    Drag your favorite course in folder
                                </Box>
                                <Box px={12} fontSize={'13px'} color={'rgba(255,255,255,0.5)'} mb={5}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </Box>
                                <Droppable droppableId="character">
                                    {(provided) => (
                                        <>
                                            <div
                                                {...provided.droppableProps} ref={provided.innerRef}
                                                onMouseEnter={onMouseEnterHandler}
                                                onMouseLeave={onMouseLeaveHandler}
                                            >
                                                {console.log(hover)}
                                                <Folder total={total} isDrag={isDrag} />
                                            </div>
                                        </>
                                    )}
                                </Droppable>
                            </Box>
                        </Grid>
                        <Grid item xl={7} lg={7} md={7} sm={7} xs={12} sx={{background: '#000'}}>
                            <Droppable droppableId="drop" isDropEnabled={true}>
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        <Box width={'100%'} height={'100%'} py={2} pr={2}>
                                            <Grid container spacing={2} >
                                                {
                                                    data.slice(0, 9).map((each, index) => (
                                                        <Draggable key={each.id} draggableId={each.id} index={index}>
                                                            {(provided) => (
                                                                <>
                                                                    {(isDrag && dragId === each.id) ? (
                                                                        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                                                            <Box width={'100%'} height={'100%'} border={'1px dashed #6ECDCD'} sx={{borderRadius: '5px'}} overflow={'hidden'} />
                                                                        </Grid>
                                                                    ) : ''}
                                                                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}
                                                                          {...provided.draggableProps}
                                                                          {...provided.dragHandleProps}
                                                                          ref={provided.innerRef}
                                                                    >
                                                                        <Card title={each.title} tag={each.tag} topic={each.topic}
                                                                              hover={hover}
                                                                              isDrag={isDrag}
                                                                              dragId={dragId}
                                                                              id={each.id}
                                                                              rotate={(isDrag && !hover && dragId === each.id) ? 'rotate(-7.73deg)' : ''}
                                                                              scale={(isDrag && hover && dragId === each.id) ? 'scale(0.6)' : ''}
                                                                              boxShadow={(isDrag && dragId === each.id) ? '0px 0px 36px 16px rgba(110, 205, 205, 0.2)' : ''}
                                                                        />
                                                                    </Grid>
                                                                </>
                                                            )}
                                                        </Draggable>
                                                    ))
                                                }
                                            </Grid>
                                        </Box>
                                    </div>)}
                            </Droppable>
                        </Grid>
                    </Grid>
                </Box>
            </DragDropContext>
        </>
    )
}