
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '../components/account/layout';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';

const DetailAccount = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <div>
                        <Typography variant="h4">
                            Account
                        </Typography>
                    </div>
                    <div>
                        <Grid>
                            {/* <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile />
                            </Grid> */}
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails />
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            </Container>
        </Box>
    </>
);

// DetailAccount.getLayout = (DetailAccount) => (
//     <DashboardLayout>
//         {DetailAccount}
//     </DashboardLayout>
// );
export default DetailAccount;
