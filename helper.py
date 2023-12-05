import bpy
import os

def setup_render_settings(output_path):
    bpy.context.scene.render.image_settings.file_format = 'PNG'
    bpy.context.scene.render.filepath = output_path

def setup_lighting():
    # Add a point lamp
    bpy.ops.object.light_add(type='POINT', align='WORLD', location=(0, 0, 5))
    
    # Add a sun lamp
    bpy.ops.object.light_add(type='SUN', align='WORLD', location=(5, 5, 5))

def main(blender_file_path, output_path):
    # Load the Blender file
    bpy.ops.wm.open_mainfile(filepath=blender_file_path)

    # Set up rendering settings
    setup_render_settings(output_path)

    # Set up lighting
    setup_lighting()

    # Render the scene
    bpy.ops.render.render(write_still=True)

if __name__ == "__main__":
    # Set the path to your Blender file
    blender_file_path = "/path/to/your/3d_model.blend"

    # Set the output path for the rendered image
    output_path = "/path/to/output/render.png"

    # Check if the Blender file exists
    if not os.path.exists(blender_file_path):
        print(f"Error: Blender file not found at {blender_file_path}")
    else:
        # Execute the main function
        main(blender_file_path, output_path)

        print("Rendering complete!")
