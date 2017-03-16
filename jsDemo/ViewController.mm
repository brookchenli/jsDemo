//
//  ViewController.m
//  jsDemo
//
//  Created by Brook on 2017/3/15.
//  Copyright © 2017年 5wei. All rights reserved.
//

#import "ViewController.h"
#import "TestViewController.h"
#import "CocosManager.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    
    UIButton *button = [[UIButton alloc] initWithFrame:CGRectMake(100, 100, 100, 200)];
    button.backgroundColor = [UIColor grayColor];
    [button setTitle:@"push" forState:UIControlStateNormal];
    [button addTarget:self action:@selector(buttonPressed) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
    // Do any additional setup after loading the view, typically from a nib.
}

-(void)buttonPressed{
    TestViewController *game = [TestViewController new];
    [self.navigationController pushViewController:game animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
