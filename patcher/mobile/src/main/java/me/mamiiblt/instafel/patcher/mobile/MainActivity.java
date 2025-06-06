package me.mamiiblt.instafel.patcher.mobile;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.navigation.NavController;
import androidx.navigation.NavDestination;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.color.DynamicColors;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import me.mamiiblt.instafel.patcher.mobile.utils.Utils;

public class MainActivity extends AppCompatActivity {


    TextView titleView;
    ImageView coreInfoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            DynamicColors.applyToActivityIfAvailable(this);
        } else {
            setTheme(R.style.Base_Theme_InstafelPatcherMobile);
        }
        setContentView(R.layout.activity_main);
        EdgeToEdge.enable(this);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, 0);
            return insets;
        });

        titleView = findViewById(R.id.title);
        coreInfoView = findViewById(R.id.coreInfoID);
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupWithNavController(bottomNavigationView, navController);

        coreInfoView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new MaterialAlertDialogBuilder(MainActivity.this)
                        .setTitle("About Core")
                        .setMessage("Core is a JAR file that contains patches, patcher components, and tiny dependencies, among other things. Instafel always supports only the latest Alpha builds, so make sure your Core is up to date.")
                        .setPositiveButton("Okay", null)
                        .show();
            }
        });
        coreInfoView.setVisibility(View.GONE);

        navController.addOnDestinationChangedListener(new NavController.OnDestinationChangedListener() {
            @Override
            public void onDestinationChanged(@NonNull NavController controller, @NonNull NavDestination destination, @Nullable Bundle arguments) {
                if (destination.getId() == R.id.nav_home) {
                    titleView.setText("Home");
                } else if (destination.getId() == R.id.nav_patches) {
                    titleView.setText("Patches");
                } else if (destination.getId() == R.id.nav_core) {
                    titleView.setText("Core");
                } else if (destination.getId() == R.id.nav_settings) {
                    titleView.setText("Settings");
                }

                if (destination.getId() == R.id.nav_core) {
                    coreInfoView.setVisibility(View.VISIBLE);
                } else {
                    coreInfoView.setVisibility(View.GONE);
                }
            }
        });
    }
}