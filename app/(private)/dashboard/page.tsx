import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { IconAccessPoint, IconCircles, IconShare } from "@tabler/icons-react";

import MainCard from "@/components/ui/cards/MainCard";
import MarketShareAreaChartCard from "@/components/ui/market-share-area/MarketShareArea";
import { gridSpacing } from "@/constants/constant";

const Dashboard = () => {
  const blockSX = {
    p: 2.5,
    borderLeft: "1px solid ",
    borderBottom: "1px solid ",
    borderLeftColor: "grey.200",
    borderBottomColor: "grey.200",
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MarketShareAreaChartCard />
          </Grid>
          <Grid item xs={12} lg={6}></Grid>
          <Grid item xs={12} lg={6}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                "& svg": {
                  width: 50,
                  height: 50,
                  color: "secondary.main",
                  borderRadius: "14px",
                  p: 1.25,
                  bgcolor: "primary.light",
                },
              }}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={{ xs: "space-between", sm: "center" }}
                  >
                    <Grid item>
                      <IconShare stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        120
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        Shares
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={{ xs: "space-between", sm: "center" }}
                  >
                    <Grid item>
                      <IconAccessPoint stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        6
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        Online
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justifyContent={{ xs: "space-between", sm: "center" }}
                  >
                    <Grid item>
                      <IconCircles stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        50
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        Retornos
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
