import { Button, Modal, Typography, Box, useMediaQuery, useTheme, IconButton, Slide, Backdrop } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import { getLocation } from "../utils/geolocation";

const StyledImage = styled("img")({
    maxWidth: "100%",
    height: "auto",
    maxHeight: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
});

const FloorImage = styled("img")({
    maxWidth: "100%",
    height: "auto",
    maxHeight: "calc(70vh - 32px)",
    objectFit: "contain",
    padding: "12px 0 12px 0",
    boxSizing: "border-box",
});

const SideloadContainer = styled("div")(({ theme, isMobile, isTablet }) => ({
    position: "fixed",
    top: isMobile ? "auto" : 64,
    bottom: isMobile ? 0 : "auto",
    left: 0,
    width: isMobile ? "100%" : isTablet ? "350px" : "320px",
    height: isMobile ? "60vh" : "calc(100vh - 64px)",
    background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.95) 100%)",
    backdropFilter: "blur(10px)",
    borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.1)",
    borderTop: isMobile ? "1px solid rgba(255,255,255,0.1)" : "none",
    borderTopLeftRadius: isMobile ? "16px" : 0,
    borderTopRightRadius: isMobile ? "16px" : 0,
    boxShadow: isMobile 
        ? "0 -8px 32px rgba(0,0,0,0.3)" 
        : "8px 0 32px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const ContentWrapper = styled("div")({
    padding: "16px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

const Header = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    position: "sticky",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(10px)",
    padding: "8px 0",
    zIndex: 1,
});

const InfoSection = styled("div")({
    flex: 1,
    marginBottom: "16px",
});

const ActionSection = styled("div")({
    position: "sticky",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(10px)",
    padding: "16px 0",
    borderTop: "1px solid rgba(255,255,255,0.1)",
});

const Sideload = ({ data, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const sideloadRef = useRef(null);

    if (!data) {
        return null;
    }

    const [sourceCoords, setSourceCoords] = useState(null);
    const [floorModalOpen, setFloorModalOpen] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState(null);

    // Handle click outside to close (disabled when floor modal is open)
    useEffect(() => {
        if (floorModalOpen) return;
        const handleClickOutside = (event) => {
            if (sideloadRef.current && !sideloadRef.current.contains(event.target)) {
                onClose && onClose();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose && onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose, floorModalOpen]);

    const handleNavigate = async () => {
        await getLocation(setSourceCoords);
        if (sourceCoords) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceCoords.latitude},${sourceCoords.longitude}&destination=${data.latitude},${data.longitude}`;
            window.open(url, '_blank');
        } else {
            alert("Please allow location access to get directions");
        }
    };

    const openFloorPlan = (index) => {
        if (data.floor_plans[index]) {
            setSelectedFloor({
                name: data.name,
                floor: index + 1,
                floor_plan: data.floor_plans[index]
            });
            setFloorModalOpen(true);
        }
    };

    return (
        <>
            <Slide 
                direction={isMobile ? "up" : "right"} 
                in={!!data} 
                timeout={300}
            >
                <SideloadContainer 
                    ref={sideloadRef}
                    isMobile={isMobile}
                    isTablet={isTablet}
                >
                    <ContentWrapper>
                        <Header>
                            <Typography 
                                variant="h6" 
                                color="white"
                                sx={{ 
                                    fontWeight: 600,
                                    fontSize: isMobile ? '1.1rem' : '1.25rem'
                                }}
                            >
                                Building Details
                            </Typography>
                            <IconButton 
                                onClick={onClose}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                                size={isMobile ? "small" : "medium"}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Header>

                        <InfoSection>
                            {/* Building Image */}
                            <Box sx={{ textAlign: "center", mb: 2 }}>
                                <StyledImage src={data.image} alt={data.name} />
                            </Box>

                            {/* Building Name */}
                            <Typography 
                                variant="h4"
                                color="gold"
                                textAlign="center"
                                sx={{ 
                                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                                    fontWeight: 700,
                                    mb: 2,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                }}
                            >
                                {data.name}
                            </Typography>

                            {/* Coordinates */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon sx={{ color: '#ff6b6b', mr: 1, fontSize: '1.2rem' }} />
                                <Typography 
                                    variant="body2"
                                    color="rgba(255,255,255,0.8)"
                                    sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                                >
                                    {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}
                                </Typography>
                            </Box>

                            {/* Description */}
                            <Typography 
                                variant="body1"
                                color="white"
                                sx={{ 
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                    lineHeight: 1.6,
                                    mb: 2,
                                    textAlign: 'justify'
                                }}
                            >
                                {data.description}
                            </Typography>

                            {/* Departments */}
                            {data.departments && data.departments.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <BusinessIcon sx={{ color: '#4dabf7', mr: 1, fontSize: '1.2rem' }} />
                                        <Typography 
                                            variant="h6"
                                            color="white"
                                            sx={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 600 }}
                                        >
                                            Departments
                                        </Typography>
                                    </Box>
                                    <Typography 
                                        variant="body2"
                                        color="rgba(255,255,255,0.9)"
                                        sx={{ 
                                            fontSize: isMobile ? '0.85rem' : '0.95rem',
                                            pl: 4
                                        }}
                                    >
                                        {data.departments.join(' • ')}
                                    </Typography>
                                </Box>
                            )}

                            {/* Floor Plans */}
                            {data.floor_count > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography 
                                        variant="h6"
                                        color="white"
                                        sx={{ 
                                            fontSize: isMobile ? '1rem' : '1.1rem',
                                            fontWeight: 600,
                                            mb: 1
                                        }}
                                    >
                                        Floor Plans
                                    </Typography>
                                    <Box sx={{ 
                                        display: "flex", 
                                        flexWrap: "wrap", 
                                        gap: 1,
                                    }}>
                                        {Array.from({ length: data.floor_count }, (_, index) => (
                                            <Button
                                                key={index}
                                                variant="contained"
                                                onClick={() => openFloorPlan(index)}
                                                sx={{
                                                    minWidth: isMobile ? 45 : 50,
                                                    minHeight: isMobile ? 45 : 50,
                                                    borderRadius: '12px',
                                                    backgroundColor: '#ff6b6b',
                                                    '&:hover': {
                                                        backgroundColor: '#ff5252',
                                                        transform: 'scale(1.05)'
                                                    },
                                                    transition: 'all 0.2s ease',
                                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </InfoSection>

                        <ActionSection>
                            <Button 
                                variant="contained"
                                onClick={handleNavigate}
                                fullWidth
                                sx={{
                                    backgroundColor: '#51cf66',
                                    '&:hover': {
                                        backgroundColor: '#40c057',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 16px rgba(81, 207, 102, 0.3)'
                                    },
                                    borderRadius: '12px',
                                    py: isMobile ? 1.5 : 1.2,
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    textTransform: 'none'
                                }}
                                startIcon={<LocationOnIcon />}
                            >
                                Get Directions
                            </Button>
                        </ActionSection>
                    </ContentWrapper>
                </SideloadContainer>
            </Slide>

            {/* Floor Plan Modal */}
            {floorModalOpen && selectedFloor && (
                <FloorPlanModal 
                    floor={selectedFloor}
                    open={floorModalOpen}
                    onClose={() => setFloorModalOpen(false)}
                />
            )}
        </>
    );
};

// Floor Plan Modal Component
const FloorPlanModal = ({ floor, open, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleModalClose = (event, reason) => {
        // Prevent closing the sideload when modal closes
        if (event) {
            event.stopPropagation();
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: { backgroundColor: 'rgba(0,0,0,0.8)' },
                onClick: (e) => e.stopPropagation()
            }}
        >
            <Slide direction="up" in={open} timeout={300}>
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -40%)',
                        width: isMobile ? '95%' : '80%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        backgroundColor: 'rgba(20,20,20,0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Modal Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="white"
                            sx={{ fontWeight: 600 }}
                        >
                            {floor.name} - Floor {floor.floor}
                        </Typography>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Modal Content */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'auto'
                        }}
                    >
                        <FloorImage
                            src={floor.floor_plan}
                            alt={`${floor.name} Floor ${floor.floor}`}
                        />
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
};

export default Sideload;
