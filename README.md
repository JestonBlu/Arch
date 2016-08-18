#### My Archbang Setup
![](openbox.png)

#### Configuration Files for look and feel

  * home: these files belong in the home directory
  * dmenu: ~/.config/dmenu/
  * Simple2: /usr/share/themes/Simple2/ (theme for openbox and gtk)

##### Archbang install guide

This guide is mainly to remind me how to install the boot loader everytime I redo my arch distro. I pretty much put it together from this link that was written for a straight arch install.

http://gloriouseggroll.tv/arch-linux-efi-install-guide/

##### Set up disks
* `efivar -l` Checks whether you have and UEFI motherboard
* `lsblk` Check out your disks, probably interested in /dev/sda
* `sudo gparted` clear your disks
* setup disks:
```
cgdisk /dev/sdX

## Set up root partition
[New] Press Enter
First Sector: Leave this blank ->press Enter
Size in sectors: [size]GiB
Hex Code: 8200 ->press Enter
Enter new partition name: root ->press Enter

## Set up swap partition
[New] Press Enter
First Sector: Leave this blank ->press Enter
Size in sectors: [size]GiB ->press Enter
Hex Code: 8200 ->press Enter
Enter new partition name: swap ->press Enter

## Set up Boot Partition /dev/sda3
[New] Press Enter
First Sector: Leave this blank ->press Enter
Size in sectors: 1024MiB ->press Enter
Hex Code: EF00 press Enter
Enter new partition name: boot ->press Enter
```

* Set up disk format

```
sudo mkfs.fat -F32 /dev/sda3
sudo mkswap /dev/sda2
sudo swapon /dev/sda2
sudo mkfs.ext4 /dev/sda1

sudo mount /dev/sda1 /mnt
sudo mkdir /mnt/boot
sudo mount /dev/sda3 /mnt/boot
```

##### Go through steps 1-10 of the gui install (choose systemd on step 10)

* `sudo arch-chroot /mnt` chroot into the system
* `sudo nano /etc/pacman.d/mirrorlist` uncomment a close mirrior
* `pacman-key --init` initialize pacman
* `sudo pacman-key --populate archlinux`
* `sudo pacman -Sy` update repositories
* `sudo pacman -S archlinux-keyring` may need to update keyring if iso is out of date
* `sudo pacman -S bash-completion`
* `sudo mount -t efivarfs efivarfs /sys/firmware/efi/efivars` mount efi
* `sudo bootctl install`
* `sudo pacman -Syyu` update system

##### Reboot
