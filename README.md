This is project makes it easier to create complex beat patterns for our drumbot. 
Website is hosted [here](https://drumbotbeatmaker.netlify.app/)

## Usage
Upon opening the website, set the tempo (resolution) of the beat. Higher tempo means more space, thus allowing more diverse beats.
Click on a cell to add a drumbeat. Cells placed on the upper row means the robot will hit the left drumstick, while the cells on the lower row are each right hits.

Construct your beat and then click the "Play" button to listen to your beat. Clicking on a placed cell removes it. 
After you make sure the beat is perfect, click the export button and use the exported beat code in your robot project.

    CommandScheduler.getInstance().schedule(new SequentialCommandGroup( -> Exported Code Here <- ));






