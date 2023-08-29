import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Appbar from '../component/app-bar';
import BreadcrumbsPage from '../component/BreadcrumbsPage';
import DetailsCard from '../component/details-card';



const theme = createTheme();

export default function DetailSubject() {
    return (
        <ThemeProvider theme={theme}>
            <Appbar></Appbar>


            <BreadcrumbsPage
                pages={[
                    { title: "รายละเอียดวิชา" },
                ]} />

            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 1,
                        pb: 6,

                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h6"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ภาคการศีกษาที่ 1 ปีการศีกษา 2580
                        </Typography>

                        <div className="detail-sudject">
                            <DetailsCard
                                title={'รหัสวิชา'}
                                description={'234-423'}
                                rootClassName="rootClassName1"></DetailsCard>
                            <DetailsCard
                                title={'ชื่อวิชาภาษาไทย'}
                                description={'คณิตศาสตร์'}
                                rootClassName="rootClassName1"></DetailsCard>
                            <DetailsCard
                                title={'หน่วยกิต'}
                                description={'3'}
                                rootClassName="rootClassName1"></DetailsCard>
                            <DetailsCard
                                title={'ชื่อวิชาภาษาอังกฤษ'}
                                description={'Math'}
                                rootClassName="rootClassName1"></DetailsCard>
                        </div>

                    </Container>
                
                </Box>
            </main>

        </ThemeProvider>
    );
}

