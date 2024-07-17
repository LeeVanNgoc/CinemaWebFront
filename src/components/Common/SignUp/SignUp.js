import React from 'react';
import { Grid, TextField, Button, Typography, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = ({ open, onClose }) => {
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="sign-up-modal"
        aria-describedby="sign-up-form"
    >
        <Box 
        sx={{
            backgroundColor: '#020817', 
            padding: 4, 
            borderRadius: 2, 
            width: 575,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
        <IconButton 
            sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16
            
            }}
            onClick={onClose}
        >
            <CloseIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Typography variant="h5" gutterBottom sx={{ color: '#fff' , fontWeight: 'bold' }}>
            Đăng ký
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                label="Họ"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Tên"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                label="Tên tài khoản"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="Xác nhận mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ input: { color: '#fff' }, label: { color: '#fff' } }}
            />
            </Grid>
        </Grid>
        <Button
            variant="contained"
            fullWidth
            sx={{
            marginTop: 2,
            padding: 1,
            backgroundColor: '#FF5252',
            '&:hover': {
                backgroundColor: '#FF1744',
            },
            color: '#fff',
            textTransform: 'none',
            borderRadius: '20px',
            }}
        >
            Đăng ký
        </Button>
        <Typography variant="body2" sx={{ color: '#fff', marginTop: 2 , textAlign: 'center' }}>
            Bạn đã có tài khoản? <a href="#" style={{ color: '#FF5252' }}>Đăng nhập</a>
        </Typography>
        </Box>
    </Modal>
  );
};
  
export default SignUp;