import React, { Component } from 'react';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage } from '../../actions/imageFileActions';
import { Carousel, CarouselSlide } from 'material-ui-carousel';

class CarouselExt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      image: {},
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setState({ image: nextProps.image });
      const imageData = {
        files: this.state.files
      };
      if (nextProps.image.uploading) {
        this.props.uploadImage(imageData, this.props.history);
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  pictures = [
    {
      image:
        'https://raw.githubusercontent.com/Almaju/material-ui-carousel/master/example/public/photo-1.jpeg',
      title: 'A Nice Car'
    },
    {
      image:
        'https://raw.githubusercontent.com/Almaju/material-ui-carousel/master/example/public/photo-2.jpeg',
      title: 'Delicious Coffee'
    },
    {
      image:
        'https://raw.githubusercontent.com/Almaju/material-ui-carousel/master/example/public/photo-3.jpeg',
      title: 'Beautiful Dog'
    }
  ];
  render() {
    const { errors } = this.state;
    return (
      <Carousel>
        {this.pictures.map(({ image, title }) => (
          <CarouselSlide key={image}>
            <Card>
              <CardMedia
                image={image}
                title={title}
                style={{
                  height: 0,
                  paddingTop: '75%'
                }}
              />
              <CardContent>
                <Typography>{title}</Typography>
              </CardContent>
            </Card>
          </CarouselSlide>
        ))}
      </Carousel>
    );
  }
}
CarouselExt.propTypes = {
  image: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  image: state.image
});
export default connect(
  mapStateToProps,
  { uploadImage }
)(CarouselExt);
