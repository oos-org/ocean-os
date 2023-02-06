import { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  OutlinedInput,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  Button,
  FormHelperText
} from '@mui/material';
import Logo from '../../../../components/LogoSign';

import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonNotify = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);
type TimeLeft = { days: number, hours:number, minutes: number, seconds: number} ;

function StatusComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2023`) - +new Date();
    const timeLeft:TimeLeft = { days: 0, hours: 0, minutes: 0, seconds:0 };

    if (difference > 0) {
        timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
        timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents:Array<ReactElement> = [];

  Object.entries(timeLeft).forEach( ([key,value]) => {
    timerComponents.push(
      <Box textAlign="center" px={3}>
        <TypographyH1 variant="h1">{value}</TypographyH1>
        <TypographyH3 variant="h3">{key}</TypographyH3>
      </Box>
    );
  })

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Logo />
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                Coming Soon
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                We're working on implementing the last features before our
                launch!
              </Typography>
            </Container>
            <img
              alt="Coming Soon"
              height={200}
              src="/assets/images/status/coming-soon.svg"
            />
          </Box>

          <Box display="flex" justifyContent="center">
            {timerComponents.length ? timerComponents : <>Time's up!</>}
          </Box>

          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInputWrapper
                  type="text"
                  placeholder="Enter your email address here..."
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonNotify variant="contained" size="small">
                        Notify Me
                      </ButtonNotify>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <MailTwoToneIcon />
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  We'll email you once our website is launched!
                </FormHelperText>
              </FormControl>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip arrow placement="top" title="Facebook">
                  <IconButton color="primary">
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Twitter">
                  <IconButton color="primary">
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Instagram">
                  <IconButton color="primary">
                    <InstagramIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;