import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';

const DraggableWrapper = props => (
  <Draggable draggableId={props.draggableId} index={props.index}>
    {provided => (
      <div className={props.className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
              {props.children}
      </div>
    )}
  </Draggable>
);

DraggableWrapper.propTypes = {
    draggableId: PropTypes.any.isRequired,
}

DraggableWrapper.defaultProps = {
}

export default DraggableWrapper;